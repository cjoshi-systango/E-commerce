import orderServices from "../services/order";
import CommonResponse from "../constants/commonResponsesConstants";
import {Request,Response} from 'express'
class OrderController{
    async createOrder(req:any,res:any){
        try {
            let order = await orderServices.createOrder(req);
            // console.log();
            
            if(typeof order == "string")
            {
                res.status(400).json({success:false,message:order})
            }
            else{
                res.status(400).json({success:false,message:CommonResponse.DATA_INSERTED});
            }
        } catch (error) {
            res.status(500).json({success:false,error:error});
        }
    }

    async getOrderHistory(req:Request,res:Response){
        try {
            let orders = await orderServices.getOrderHistory(req);
            if(typeof orders == 'string'){
                res.status(200).json({success:true,message:orders})
            }
            else{
                res.status(200).json({success:true,data:orders})
            }
        } catch (error) {
            res.status(500).json({success:false,error:error});
            
        }
    }
}

let orderController = new OrderController;
export default orderController;