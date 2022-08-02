import productServices from "../services/product";
import CommonResponse from "../constants/commonResponsesConstants";
import { string } from "joi";
import {HttpConstant} from "../constants/httpStatusConstant"
class ProductController{
    async addProduct(req:any,res:any){
        try {
            let productAdded = await productServices.addProduct(req);
            console.log(productAdded);
            if(typeof productAdded =="string"){
             res.status(HttpConstant.HTTP_UNAUTHORIZED).json({success:true,message:productAdded});

            }
            else{
             res.status(HttpConstant.HTTP_CREATED).json({success:true,data:CommonResponse.DATA_INSERTED})
            }

        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,data:error})
        }
    }

    async showAllProduct(req:any,res:any){
        try {
            let allProduct = await productServices.showAllProduct();

            res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,data:allProduct});
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:true,data:error});
            
        }
    }

    async showOneProduct(req:any,res:any){
        try {
            let oneProduct = await productServices.showOneProduct(req.params.id);
            res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,data:oneProduct});
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:true,data:error});
            
        }
    }

    async deleteProduct(req:any,res:any){
        try {
            await productServices.deleteProduct(req);

            res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,message:"deleted successfully"});
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,error:error});
            
        }
    }
}

const productController = new ProductController();
export default productController;