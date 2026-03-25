const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { authMiddelWare, authUserMiddleware } = require("../../middleware/authMiddelware");


router.post("/create", authUserMiddleware, OrderController.createOrder);
router.get("/get-all", authMiddelWare, OrderController.getAllOrderForAdmin);
router.get("/my-orders", authUserMiddleware, OrderController.getMyOrders);
router.delete("/delete/:id", authUserMiddleware, OrderController.deleteOrder);

module.exports = router;