import express from "express";
import auth from "../middleware/auth";
import orderController from "../controllers/order";
const router = express.Router();

router.post("/product/:id/order",auth,orderController.createOrder);

router.get("/order/history",auth,orderController.getOrderHistory)

export default router