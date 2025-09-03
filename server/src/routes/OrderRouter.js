const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { authMiddelWare, authenticateUser } = require("../middleware/authMiddelware");


router.post("/create", authenticateUser, OrderController.createOrder);
router.get("/get-all", authMiddelWare, OrderController.getAllOrderForAdmin);
router.get("/my-orders", authenticateUser, OrderController.getMyOrders);
router.delete("/delete/:id", authenticateUser, OrderController.deleteOrder);

module.exports = router;