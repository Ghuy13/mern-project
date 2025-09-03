// const Order = require("../models/OrderModel");

// const createOrder = async (req, res) => {
//     try {
//         const { name, email, phone, address, items, totalPrice } = req.body;
//         if (!name || !phone || !address || !items || !totalPrice) {
//             return res.status(400).json({ message: "Thiếu thông tin đơn hàng!" });
//         }
//         const order = await Order.create({ name, email, phone, address, items, totalPrice });
//         return res.status(201).json({ status: "OK", data: order });
//     } catch (err) {
//         return res.status(500).json({ message: "Lỗi server!", error: err.message });
//     }
// };

// const getAllOrder = async (req, res) => {
//     try {
//         const orders = await Order.find().sort({ createdAt: -1 });
//         return res.status(200).json({ status: "OK", data: orders });
//     } catch (err) {
//         return res.status(500).json({ message: "Lỗi server!", error: err.message });
//     }
// };

// const deleteOrder = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleted = await Order.findByIdAndDelete(id);
//         if (!deleted) {
//             return res.status(404).json({ status: "ERROR", message: "Không tìm thấy đơn hàng!" });
//         }
//         return res.status(200).json({ status: "OK", message: "Đã xóa đơn hàng!" });
//     } catch (err) {
//         return res.status(500).json({ status: "ERROR", message: "Lỗi server!", error: err.message });
//     }
// };

// const getMyOrders = async (req, res) => {
//     try {
//         const userId = req.user.id; // userId lấy từ token (JWT middleware)
//         const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//         res.json({ status: "OK", data: orders });
//     } catch (err) {
//         res.json({ status: "ERROR", message: "Không lấy được đơn hàng!" });
//     }
// };

// module.exports = {
//     createOrder,
//     getAllOrder,
//     deleteOrder,
//     getMyOrders
// };

const Order = require("../models/OrderModel");

const createOrder = async (req, res) => {
    try {
        const { name, email, phone, address, items, totalPrice } = req.body;
        const userId = req.user.id; // Lấy userId từ token đã được decode trong middleware

        if (!name || !phone || !address || !items || !totalPrice) {
            return res.status(400).json({ message: "Thiếu thông tin đơn hàng!" });
        }

        const order = await Order.create({
            userId,
            name,
            email,
            phone,
            address,
            items,
            totalPrice
        });

        return res.status(201).json({ status: "OK", data: order });
    } catch (err) {
        return res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
};

// Lấy tất cả đơn hàng (chỉ dành cho admin)
const getAllOrderForAdmin = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
        return res.status(200).json({ status: "OK", data: orders });
    } catch (err) {
        return res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
};

// Lấy đơn hàng của user hiện tại
const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy userId từ token
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({ status: "OK", data: orders });
    } catch (err) {
        return res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const isAdmin = req.user.isAdmin;

        // Tìm đơn hàng
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ status: "ERROR", message: "Không tìm thấy đơn hàng!" });
        }

        // Kiểm tra quyền: chỉ admin hoặc chủ đơn hàng mới có thể xóa
        if (!isAdmin && order.userId.toString() !== userId) {
            return res.status(403).json({ status: "ERROR", message: "Không có quyền xóa đơn hàng này!" });
        }

        const deleted = await Order.findByIdAndDelete(id);
        return res.status(200).json({ status: "OK", message: "Đã xóa đơn hàng!" });
    } catch (err) {
        return res.status(500).json({ status: "ERROR", message: "Lỗi server!", error: err.message });
    }
};

module.exports = {
    createOrder,
    getAllOrderForAdmin,
    getMyOrders,
    deleteOrder
};