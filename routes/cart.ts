import express from "express";
import cartController from "../controllers/cart";
import auth from "../middleware/auth";
import validation from "../validation/validation";
const router = express.Router();

router.post("/:id",auth,validation.addToCartValidation,cartController.addToCart)

router.get("/",auth,cartController.viewCart)

router.delete("/:id",auth,cartController.removeFromCart);
export default router;