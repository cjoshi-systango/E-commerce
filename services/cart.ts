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
                await cart.increment({quantity:req.body.quantity},{where:{productId:req.params.id,userId:req.user.id}})
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
}

let cartServices = new CartServices();
export default cartServices;