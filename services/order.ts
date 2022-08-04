import { Model } from "sequelize/types";
import order from "../models/order";
import product from "../models/product";
import productServices from "./product";
import userServices from "./userService";
import cartServices from "./cart";
class OrderServices {
    async createOrder(req: any) {
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
                return "please add address first";
            }

        }
        else {
            return `Sorry only ${productAvailableInStock} left in stock`;
        }
    }

    async getOrderHistory(req: any) {
        let orderByUser: any = await order.findOne({ include: [{ model: product, where: { userId: req.user.id } }] })
        console.log(orderByUser.length);

        if (orderByUser) {
            return orderByUser;
        } else {
            return 'No order history';
        }
    }

}

let orderServices = new OrderServices;
export default orderServices;