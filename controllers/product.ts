import productServices from "../services/product";
import CommonResponse from "../constants/commonResponsesConstants";
import { string } from "joi";
class ProductController{
    async addProduct(req:any,res:any){
        try {
            let productAdded = await productServices.addProduct(req);
            console.log(productAdded);
            if(typeof productAdded =="string"){
             res.status(200).json({success:true,data:"",message:productAdded});

            }
            else{
             res.status(200).json({success:true,data:"Product add successfully"})

            }

        } catch (error) {
            res.status(400).json({success:false,data:error})
        }
    }

    async showAllProduct(req:any,res:any){
        try {
            let allProduct = await productServices.showAllProduct();

            res.status(200).json({success:true,data:allProduct});
        } catch (error) {
            res.status(400).json({success:true,data:error});
            
        }
    }

    async showOneProduct(req:any,res:any){
        try {
            let oneProduct = await productServices.showOneProduct(req.params.id);
            res.status(200).json({success:true,data:oneProduct});
        } catch (error) {
            res.status(400).json({success:true,data:error});
            
        }
    }
}

const productController = new ProductController();
export default productController;