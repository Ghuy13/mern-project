const Order = require("../models/OrderModel");

const createOrder = async (req, res) => {
    try {
        const { name, email, phone, address, items, totalPrice } = req.body;
        if (!name || !phone || !address || !items || !totalPrice) {
            return res.status(400).json({ message: "Thiếu thông tin đơn hàng!" });
        }
        const order = await Order.create({ name, email, phone, address, items, totalPrice });
        return res.status(201).json({ status: "OK", data: order });
    } catch (err) {
        return res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return res.status(200).json({ status: "OK", data: orders });
    } catch (err) {
        return res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Order.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ status: "ERROR", message: "Không tìm thấy đơn hàng!" });
        }
        return res.status(200).json({ status: "OK", message: "Đã xóa đơn hàng!" });
    } catch (err) {
        return res.status(500).json({ status: "ERROR", message: "Lỗi server!", error: err.message });
    }
};



module.exports = {
    createOrder,
    getAllOrder,
    deleteOrder
};