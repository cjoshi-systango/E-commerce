import cartServices from "../services/cart";
import {HttpConstant} from '../constants/httpStatusConstant';
import CommonResponse from "../constants/commonResponsesConstants";

class CartController{
    async addToCart(req:any,res:any){
        try {
            let result =  await cartServices.addToCart(req);
            if(result === "out of stock"){
                res.status(HttpConstant.HTTP_UNAUTHORIZED).json({success:false,data:"Can't add in Cart Out of stock"})
            }
            else if(result === "quantity error")
            {
                res.status(HttpConstant.HTTP_UNAUTHORIZED).json({success:false,data:"Can't add more than Stock"})
            }
            else{
                res.status(HttpConstant.HTTP_CREATED).json({success:true,data:CommonResponse.DATA_INSERTED});
            }
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,message:CommonResponse.SOMETHING_WENT_WRONG});
            
        }
    }

    async viewCart(req:any,res:any){
        try {
           let cartData = await cartServices.viewCart(req)
           if(typeof cartData == "string"){
              res.status(HttpConstant.HTTP_NOT_FOUND).json({success:true,message:"cart is empty"});
           }
           else{
                res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,data:cartData});
           }

        } catch (error) {
           res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,message:CommonResponse.SOMETHING_WENT_WRONG});
            
        }
    }

    async removeFromCart(req:any,res:any){
        try {
            await cartServices.removeFromCart(req);
            res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,message:"deleted successfully"});

        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,message:CommonResponse.SOMETHING_WENT_WRONG});
        }
    }
}

let cartController = new CartController();
export default cartController;