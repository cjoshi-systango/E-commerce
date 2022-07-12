import order from "../models/order";
import productServices from "./product";
class OrderServices{
    async createOrder(req:any){
        let productAvailableInStock = await productServices.getProductQuantity(req);
        console.log(req.body.quantity);
        
        if(productAvailableInStock>=req.body.quantity)
        {
            let price:any = await productServices.getProductPrice(req)
            let totalAmount = price * req.body.quantity;
            console.log(totalAmount);
            await order.create({quantity:req.body.quantity,userId:req.user.id,productId:req.params.id,amount:totalAmount}).then(async()=>{
                await productServices.changeProductQuantity(req);
            })
        }
        else{
            console.log("---");
            
            return `Sorry only ${productAvailableInStock} left in stock`;
        }
    }
}

let orderServices = new OrderServices;
export default orderServices;