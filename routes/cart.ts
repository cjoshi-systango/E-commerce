import express from "express";
import cartController from "../controllers/cart";
import auth from "../middleware/auth";
const router = express.Router();

router.post("/product/:id/addtocart",auth,cartController.addToCart)

export default router;