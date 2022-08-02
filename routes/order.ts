import express from "express";
import auth from "../middleware/auth";
import orderController from "../controllers/order";
import validation from "../validation/validation";
const router = express.Router();

router.post("/:id",auth,validation.orderValidation,orderController.createOrder);

router.get("/history",auth,orderController.getOrderHistory)

export default router