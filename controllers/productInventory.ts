
import productInventoryServices from "../services/producInventory";
class ProductInventoryControler {
    async insertInInventory(req: any) {
        console.log("inside inventory");
        let inventoryId = await productInventoryServices.insertInInventory(req);
        return inventoryId
    }
}

const productInventoryControler = new ProductInventoryControler();
export default productInventoryControler;
