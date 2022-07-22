import express from "express";
import cartController from "../controllers/cart";
import auth from "../middleware/auth";
import validation from "../validation/validation";
const router = express.Router();

router.post("/product/:id/addtocart",auth,validation.addToCartValidation,cartController.addToCart)

router.get("/viewcart",auth,cartController.viewCart)

router.delete("/viewcart/:id/remove",auth,cartController.removeFromCart);
export default router;