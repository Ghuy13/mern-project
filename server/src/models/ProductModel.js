const mongoose = require('mongoose');

// Định nghĩa schema cho sản phẩm
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String },
    },
    {
        timestamps: true, // Tự động thêm createdAt và updatedAt
    }
);

// Tạo model Product từ schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
