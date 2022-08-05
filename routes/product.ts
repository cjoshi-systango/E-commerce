import express from 'express';
import auth from '../middleware/auth';
import productController from '../controllers/product';
import validation from '../validation/validation';
const router = express.Router();

router.post("/", auth, validation.addProductValidation,productController.addProduct);

router.get("/:id?",auth,productController.showProduct)

router.get("/search/:text?",auth,productController.showProductByUserText)

router.delete("/:id",auth,productController.deleteProduct)

router.put("/:id",auth,productController.updateProduct)

export default router;