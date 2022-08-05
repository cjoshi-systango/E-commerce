import { Model } from "sequelize/types";
import order from "../models/order";
import product from "../models/product";
import productServices from "./product";
import userServices from "./userService";
import cartServices from "./cart";

const ADDRESS_NOT_FOUND = "Please add address first";
const ORDER_HISTORY_NOT_FOUND = "No order history"

class OrderServices {
    async createOrder(req: any) {
        try {
            let productAvailableInStock = await productServices.getProductQuantity(req);
            if (productAvailableInStock >= req.body.quantity) {
                let userAddress: any = await userServices.findUserAddress(req);
                if (userAddress) {
                    let isProductInCart = await cartServices.showProductInCart(req);
    
                    if (typeof isProductInCart == "string") {
    
                        let price: any = await productServices.getProductPrice(req)
                        let totalAmount = price * req.body.quantity;
                        console.log(totalAmount);
                        await order.create({ quantity: req.body.quantity, userId: req.user.id, productId: req.params.id, amount: totalAmount })
    
                    }
                    else{
                        let price: any = await productServices.getProductPrice(req)
                        let totalAmount = price * req.body.quantity;
                        console.log(totalAmount);
                        await order.create({ quantity: req.body.quantity, userId: req.user.id, productId: req.params.id, amount: totalAmount, cartId:isProductInCart.id})
                        await cartServices.removeFromCart(req)
                    }
    
                }
                else {
                    return ADDRESS_NOT_FOUND;
                }
    
            }
            else {
                return `Sorry only ${productAvailableInStock} left in stock`;
            }   
        } catch (error) {
            throw error
        }   
    }

    async getOrderHistory(req: any) {
        try {
            let orderByUser: any = await order.findOne({ include: [{ model: product, where: { userId: req.user.id } }] })
            console.log(orderByUser.length);
    
            if (orderByUser) {
                return orderByUser;
            } else {
                return ORDER_HISTORY_NOT_FOUND;
            }   
        } catch (error) {
            throw error
        }
    }

}

let orderServices = new OrderServices;
export default orderServices;