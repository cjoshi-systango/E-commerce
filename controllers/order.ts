import orderServices from "../services/order";
import CommonResponse from "../constants/commonResponsesConstants";
import {Request,Response} from 'express'
import {HttpConstant} from '../constants/httpStatusConstant';

class OrderController{
    async createOrder(req:any,res:any){
        try {
            let order = await orderServices.createOrder(req);
            // console.log();
            
            if(typeof order == "string")
            {
                res.status(HttpConstant.HTTP_NOT_FOUND).json({success:false,message:order})
            }
            else{
                res.status(HttpConstant.HTTP_CREATED).json({success:false,message:CommonResponse.DATA_INSERTED});
            }
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,error:error});
        }
    }

    async getOrderHistory(req:Request,res:Response){
        try {
            let orders = await orderServices.getOrderHistory(req);
            if(typeof orders == 'string'){
                res.status(HttpConstant.HTTP_NO_CONTENT).json({success:true,message:orders})
            }
            else{
                res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,data:orders})
            }
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,error:error});
            
        }
    }
}

let orderController = new OrderController;
export default orderController;