import { array } from "joi";
import product from "../models/product";
import productInventoryServices from "./producInventory";
import userPermission from "../utils/userPermission";
import productInventoryControler from "../controllers/productInventory";
class ProductServices {
    async addProduct(req: any) {
        let temp = await userPermission.userPermissions(req).then((userPermission: any) => {
            if (userPermission.write) {
                console.log(userPermission.write);
                
                productInventoryControler.insertInInventory(req).then(async(inventoryId) => {    
                    await product.create({
                        name: req.body.name,
                        details: req.body.details,
                        price: req.body.price,
                        added_by: req.user.id,
                        inventory_id: inventoryId
                    });
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
        let allProduct:any = await product.findAll();
        for (let index = 0; index < allProduct.length ; index++) {
            await productInventoryServices.sendProductQuantity(allProduct[index].inventory_id)
            .then((quantity:any)=>{
                allProduct[index].dataValues.quantity = quantity.quantity
                console.log(allProduct);
            })
            .catch(err=>{
                console.log(err);
            });
        }
        return allProduct;
    }

    async showOneProduct(id:any){
        let oneProduct:any = await product.findOne({where:{id:id}});
        
        await productInventoryServices.sendProductQuantity(oneProduct.inventory_id)
        .then((quantity:any)=>{
            oneProduct.dataValues.quantity = quantity.quantity
        })
        .catch(err=>{
            console.log(err);
            
        });
        return oneProduct;
    }

    async getProductPrice(req:any){
        let price = await product.findOne({attributes:["price"],where:{id:req.params.id}})

        return price;
    }

    async getProductQuantity(req:any){
        let oneProduct:any = await product.findOne({where:{id:req.params.id}});
        
        let quantity:any = await productInventoryServices.sendProductQuantity(oneProduct.inventory_id)
        
        return quantity.quantity;
    }
}

const productServices = new ProductServices();
export default productServices;