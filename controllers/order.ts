import orderServices from "../services/order";
import CommonResponse from "../constants/commonResponsesConstants";
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
}

let orderController = new OrderController;
export default orderController;