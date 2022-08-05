
import productInventoryServices from "../services/producInventory";
class ProductInventoryControler {
    async insertInInventory(req: any) {
        let inventoryId = await productInventoryServices.insertInInventory(req);
        return inventoryId
    }
}

const productInventoryControler = new ProductInventoryControler();
export default productInventoryControler;
