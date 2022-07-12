import express from "express";
import cartController from "../controllers/cart";
import auth from "../middleware/auth";
const router = express.Router();

router.post("/product/:id/addtocart",auth,cartController.addToCart)

router.get("/viewcart",auth,cartController.viewCart)

router.get("/viewcart/:id/remove")
export default router;