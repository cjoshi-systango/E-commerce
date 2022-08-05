import productServices from "../services/product";
import CommonResponse from "../constants/commonResponsesConstants";
import { string } from "joi";
import {HttpConstant} from "../constants/httpStatusConstant"
import {Request,Response} from "express"

class ProductController{
    async addProduct(req:Request,res:Response){
        try {
            let productAdded = await productServices.addProduct(req);
            console.log(productAdded);
            if(typeof productAdded =="string"){
             res.status(HttpConstant.HTTP_UNAUTHORIZED).json({success:true,message:productAdded});
            }
            else{
             res.status(HttpConstant.HTTP_CREATED).json({success:true,message:CommonResponse.DATA_INSERTED})
            }

        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,message: CommonResponse.SOMETHING_WENT_WRONG})
        }
    }

    async showProduct(req:Request,res:Response){
        try {
            let allProduct = await productServices.showProduct(req);
            res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,data:allProduct});
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:true,message:CommonResponse.SOMETHING_WENT_WRONG});
            
        }
    }

    async showProductByUserText(req:Request,res:Response){
        try {
            let oneProduct = await productServices.showProductByUserText(req);
            res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,data:oneProduct});
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:true,message:CommonResponse.SOMETHING_WENT_WRONG});
        }
    }

    async deleteProduct(req:Request,res:Response){
        try {
            await productServices.deleteProduct(req);

            res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,message:"deleted successfully"});
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,message:CommonResponse.SOMETHING_WENT_WRONG});
            
        }
    }

    async updateProduct(req:Request,res:Response){
        try {
            let isUpdated = await productServices.updateProduct(req);
            if(typeof isUpdated == 'string'){
                res.status(HttpConstant.HTTP_UNAUTHORIZED).json({success:true,message:isUpdated});
            }
            else{
                res.status(HttpConstant.HTTP_CREATED).json({success:true,data:CommonResponse.DATA_INSERTED})
            }
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,message:CommonResponse.SOMETHING_WENT_WRONG});
        }
    }
}

const productController = new ProductController();
export default productController;