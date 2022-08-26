import dotenv from 'dotenv'
dotenv.config();
import order from "../models/order";
import product from "../models/product";
import productServices from "./product";
import userServices from "./userService";
import cartServices from "./cart";
const stripe = require('stripe')(process.env.SECRET_KEY);
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
                        let isPaymentIntented = this.makePayment(totalAmount)
                        return isPaymentIntented
                    }
                    else{
                        let price: any = await productServices.getProductPrice(req)
                        let totalAmount = price * req.body.quantity;
                        console.log(totalAmount);
                        await order.create({ quantity: req.body.quantity, userId: req.user.id, productId: req.params.id, amount: totalAmount, cartId:isProductInCart.id})
                        await cartServices.removeFromCart(req)
                        let isPaymentIntented = this.makePayment(totalAmount)
                        return isPaymentIntented
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

    async makePayment(amount:number){
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            payment_method: 'pm_1LXmaOSESDVemvbfnOg9OS15',
        });

        return paymentIntent
    }

    async getOrderHistory(req: any) {
        try {
            let orderByUser: any = await order.findAll({where: { userId: req.user.id },include: [{ model: product}] })
            
            if (orderByUser.length>0) {
                return orderByUser;
            } else {
                return ORDER_HISTORY_NOT_FOUND;
            }   
        } catch (error) {
            console.log(error);
            
            throw error
        }
    }

    async webHook(req:any){
        try {
            const sig = req.headers['stripe-signature'];
            console.log(sig);
            

        } catch (error) {
            console.log(error);
            
        }
    }
}

let orderServices = new OrderServices;
export default orderServices;