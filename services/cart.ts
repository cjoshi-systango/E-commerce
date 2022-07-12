import e from "cors";
import { where } from "sequelize/types";
import cart from "../models/cart";
import productServices from "./product";
class CartServices {
    async addToCart(req: any) {

        let quantity:any = await productServices.getProductQuantity(req);

        if (quantity >= req.body.quantity) {
            let product:any = await cart.findOne({where:{productId:req.params.id,userId:req.user.id}})
            console.log(product);
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
            return "out of stock";
        }
        else{
            return "quantity error";
        }

    }

    async viewCart(req:any){

        let cartData:any = await cart.findAll({where:{userId:req.user.id}});
        if(cartData){
            for(const element of cartData){
                let product = await productServices.showOneProduct(element.productId)
                element.dataValues.productName = product.name;
                element.dataValues.productdetails = product.details;
                element.dataValues.productPrice = product.price;
            }
            return cartData
        }
        else{
            return "cart is empty"
        }
       
    }
}

let cartServices = new CartServices();
export default cartServices;