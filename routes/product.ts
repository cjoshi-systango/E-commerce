import express from 'express';
import auth from '../middleware/auth';
import productController from '../controllers/product';
import validation from '../validation/validation';
const router = express.Router();

router.post("/", auth, validation.addProductValidation,productController.addProduct);

router.get("/",auth,productController.showAllProduct)

router.get("/:id",auth,productController.showOneProduct);

router.delete("/:id",auth,productController.deleteProduct)

export default router;