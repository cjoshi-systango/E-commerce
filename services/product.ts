import product from "../models/product";
import productInventoryServices from "./producInventory";
import userPermission from "../utils/userPermission";
import productInventoryControler from "../controllers/productInventory";
import sequelize from "../db/sequelizeConnection";
import productInventory from "../models/productInventory";
import productImage from "../models/productImage";
import { where } from "sequelize/types";
class ProductServices {
    async addProduct(req: any) {
        console.log(req.files);
        let images = req.files
        let arr : any[] =[]

        let temp = await userPermission.userPermissions(req).then(async(userPermission: any) => {
            if (userPermission.write) {
                console.log(userPermission.write);
                
                productInventoryControler.insertInInventory(req).then(async(inventoryId) => {  
                    let productInfo:any = await product.create({
                        name: req.body.name,
                        details: req.body.details,
                        price: req.body.price,
                        added_by: req.user.id,
                        inventory_id: inventoryId,
                    });

                    for(let index=0;index<images.length;index++){
                        await productImage.create({image:images[index].buffer,productId:productInfo.id});
                    }
                    console.log("product created");
                });
            }
            else {
                return "User does not have authority to add product"
            }
        });
        return temp;
    }
    
    async showAllProduct(){
        let allProduct:any = await product.findAll({include:productInventory});
        return allProduct;
    }

    async showOneProduct(id:any){
        let oneProduct:any = await product.findOne({where:{id:id},include:productInventory});
        return oneProduct;
    }

    async getProductPrice(req:any){
        let price:any = await product.findOne({attributes:["price"],where:{id:req.params.id}})

        return price.price;
    }

    async getProductQuantity(req:any){
        let oneProduct:any = await product.findOne({where:{id:req.params.id}});
        
        let quantity:any = await productInventoryServices.sendProductQuantity(oneProduct.inventory_id)
        
        return quantity.quantity;
    }

    async changeProductQuantity(req:any){
        let inventoryId:any = await product.findOne({attributes:["inventory_id"],where:{id:req.params.id}})
        await productInventoryServices.changeQuantity(req,inventoryId.inventory_id);
    }

    async deleteProduct(req:any){
        await product.destroy({where:{id:req.params.id,added_by:req.user.id}    })    
    }

    async updateProduct(req:any){
        try {
            if(req.body.name){
                await product.update({name:req.body.name},{where:{added_by:req.user.id,id:req.params.id}})
            }
            else if(req.body.details){
                await product.update({details:req.body.details},{where:{added_by:req.user.id,id:req.params.id}})
            }
            else if(req.body.price){
                await product.update({price:req.body.price},{where:{added_by:req.user.id,id:req.params.id}})
    
            }
            else if(req.body.quantity){
                let inventoryId:any = await product.findOne({attributes:["inventory_id"],where:{added_by:req.user.id,id:req.params.id}})
                await productInventory.update({quantity:req.body.quantity},{where:{id:inventoryId.id}})
            }
            else if(req.files){
                let isAddedBy:any = await product.findOne({where:{added_by:req.user.id}});
                let images = req.files
                if(isAddedBy.id==req.params.id){
                    for(let index=0;index<images.length;index++){
                        await productImage.update({image:images[index].buffer},{where:{productId:req.params.id}});
                    }
                }
                else{
                    return "unauthorized"
                }
            }
        } catch (error) {
            throw error
        }
        
    }
}

const productServices = new ProductServices();
export default productServices;