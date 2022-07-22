import express from 'express';
import auth from '../middleware/auth';
import productController from '../controllers/product';
import validation from '../validation/validation';
const router = express.Router();

router.post("/addproduct", auth, validation.addProductValidation,productController.addProduct);

router.get("/product",auth,productController.showAllProduct)

router.get("/product/:id",auth,productController.showOneProduct);

router.delete("/product/:id/delete",auth,productController.deleteProduct)

export default router;