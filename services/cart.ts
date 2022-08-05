import e from "cors";
import { where } from "sequelize/types";
import cart from "../models/cart";
import productServices from "./product";
import product from "../models/product";
import productInventory from "../models/productInventory";
import { log } from "console";
const CART_EMPTY_MESSAGE = "Cart is empty";
const OUT_OF_STOCK_MESSAGE = "Product out of stock";
const QUANTITY_MESSAGE = "Requested quantity is not available is stock";


class CartServices {
    async addToCart(req: any) {
        try {
            let quantity:any = await productServices.getProductQuantity(req);

            if (quantity >= req.body.quantity) {
                let product:any = await cart.findOne({where:{productId:req.params.id,userId:req.user.id}})
                if(product){
                    let price :any= productServices.getProductPrice(req);
                    let totalAmount = req.body.quantity * price;
                    await cart.increment({quantity:req.body.quantity,total_amount:totalAmount},{where:{productId:req.params.id,userId:req.user.id}})
                }
                else{
                    let price :any= productServices.getProductPrice(req);
                    let totalAmount = req.body.quantity * price;
                    await cart.create({ userId: req.user.id,productId:req.params.id,quantity:req.body.quantity,total_amount:totalAmount})
                }
                
            }
            else if(quantity===0){
                return OUT_OF_STOCK_MESSAGE;
            }
            else{
                return QUANTITY_MESSAGE;
            }   
        } catch (error) {
            throw error
        }
    }

    async viewCart(req:any){
        try {
            let cartData:any = await cart.findAll({where:{userId:req.user.id},include:[{model: product,include:[productInventory]}]});
            if(cartData.length>0){
                return cartData
            }
            else{
                return CART_EMPTY_MESSAGE
            }
        } catch (error) {
            throw error
        }
       
       
    }

    async showProductInCart(req:any){
        try {
            let cartData:any = await cart.findOne({where:{userId:req.user.id,productId:req.params.id},include:product});
            if(cartData){
                return cartData
            }
            else{
                return CART_EMPTY_MESSAGE
            }   
        } catch (error) {
            throw error
        }   
    }

    async removeFromCart(req:any){
        try {
            await cart.destroy({where:{productId:req.params.id,userId:req.user.id}})
                
        } catch (error) {
            throw error 
        }
    }
}

let cartServices = new CartServices();
export default cartServices;