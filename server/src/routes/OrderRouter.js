const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

router.post("/create", OrderController.createOrder);
router.get("/get-all", OrderController.getAllOrder);
router.delete("/delete/:id", OrderController.deleteOrder);

module.exports = router;