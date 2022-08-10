import product from "../models/product";
import productInventoryServices from "./producInventory";
import userPermission from "../utils/userPermission";
import productInventoryControler from "../controllers/productInventory";
import productInventory from "../models/productInventory";
import productImage from "../models/productImage";
import { Request, Response } from "express"
import { Op } from "sequelize"

const UNAUTHORIZED = "Unauthorized activity"

class ProductServices {
    async addProduct(req: any) {
        try {
            let images = req.files
            await userPermission.userPermissions(req).then(async (userPermission: any) => {
                if (userPermission.write) {
                    console.log(userPermission.write);

                    productInventoryControler.insertInInventory(req).then(async (inventoryId) => {
                        let productInfo: any = await product.create({
                            name: req.body.name,
                            details: req.body.details,
                            price: req.body.price,
                            added_by: req.user.id,
                            inventory_id: inventoryId,
                        });
                        if (images) {
                            for (let index = 0; index < images.length; index++) {
                                await productImage.create({ image: images[index].buffer, productId: productInfo.id });
                            }
                        }
                    });
                }
                else {
                    return UNAUTHORIZED
                }
            });
        } catch (error) {
            throw error
        }
    }

    async showProduct(req: Request) {
        try {
            if (req.params.id) {
                let oneProduct: any = await product.findOne({ where: { id: req.params.id }, include: [productInventory, productImage] });
                let numberOfimages = oneProduct.product_images.length
                for(let index=0;index<numberOfimages;index++){
                    let bufferdata:any = oneProduct.product_images[index].image;
                    oneProduct.product_images[index].image = Buffer.from(bufferdata).toString('base64');
                }
                return oneProduct;
            }
            else {
                let allProduct: any = await product.findAll({ include: [productInventory, productImage] });
                return allProduct;
            }
        } catch (error) {
            throw error
        }
    }

    async showProductByUserText(req: Request) {
        try {
            if (req.params.text) {
                console.log(req.params.text);
                let allProduct: any = await product.findAll({ where: { [Op.or]: { name: { [Op.like]: `%${req.params.text}%` }, details: { [Op.like]: `%${req.params.text}%` } } }, include: [productInventory, productImage] });
                console.log(allProduct);
    
                return allProduct;
            } else {
                let allProduct: any = await product.findAll({ include: [productInventory, productImage] });
                return allProduct;
            }   
        } catch (error) {
            throw error
        }
    }

    async getProductPrice(req: any) {
        try {
            let price: any = await product.findOne({ attributes: ["price"], where: { id: req.params.id } })

            return price.price;   
        } catch (error) {
            throw error
        }
    }

    async getProductQuantity(req: any) {
        try {
            let oneProduct: any = await product.findOne({ where: { id: req.params.id } });

            let quantity: any = await productInventoryServices.sendProductQuantity(oneProduct.inventory_id)
    
            return quantity.quantity;   
        } catch (error) {
            throw error
        }
    }

    async changeProductQuantity(req: any) {
        try {
            let inventoryId: any = await product.findOne({ attributes: ["inventory_id"], where: { id: req.params.id } })
            await productInventoryServices.changeQuantity(req, inventoryId.inventory_id);   
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(req: any) {
        try {
            await product.destroy({ where: { id: req.params.id, added_by: req.user.id } })
            
        } catch (error) {
            throw error
        }
    }

    async updateProduct(req: any) {
        try {
            if (req.body.name) {
                await product.update({ name: req.body.name }, { where: { added_by: req.user.id, id: req.params.id } })
            }
            else if (req.body.details) {
                await product.update({ details: req.body.details }, { where: { added_by: req.user.id, id: req.params.id } })
            }
            else if (req.body.price) {
                await product.update({ price: req.body.price }, { where: { added_by: req.user.id, id: req.params.id } })

            }
            else if (req.body.quantity) {
                let inventoryId: any = await product.findOne({ attributes: ["inventory_id"], where: { added_by: req.user.id, id: req.params.id } })
                await productInventory.update({ quantity: req.body.quantity }, { where: { id: inventoryId.id } })
            }
            else if (req.files) {
                let isAddedBy: any = await product.findOne({ where: { added_by: req.user.id } });
                let images = req.files
                if (isAddedBy.added_by == req.user.id) {
                    for (let index = 0; index < images.length; index++) {
                        await productImage.update({ image: images[index].buffer }, { where: { productId: req.params.id } });
                    }
                }
                else {
                    return UNAUTHORIZED
                }
            }
        } catch (error) {
            throw error
        }

    }
}

const productServices = new ProductServices();
export default productServices;