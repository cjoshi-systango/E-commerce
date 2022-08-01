import productInventory from "../models/productInventory";

class ProductInventoryServices {
    insertInInventory(req: any) {
        return new Promise((resolve,reject)=>{
            productInventory.create({ quantity: req.body.quantity })
            .then((inventory: any) => {
                console.log(inventory.id);
                
                resolve(inventory.id);
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    sendProductQuantity(id:number){
        return new Promise((resolve,reject)=>{
            productInventory.findOne({attributes:["quantity"],where:{id:id}})
            .then((quantity:any)=>{
                console.log(quantity);
                resolve(quantity);
                
            })
            .catch(err=>{
                reject(err)
            });
        })
    }

    async changeQuantity(req:any,id:any){
        await productInventory.increment({quantity:-req.body.quantity},{where:{id:id}})
    }
}

const productInventoryServices = new ProductInventoryServices();
export default productInventoryServices;
