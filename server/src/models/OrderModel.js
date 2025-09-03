// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     items: [
//         {
//             name: String,
//             amount: Number,
//             image: String,
//             price: Number,
//             product: String,
//         }
//     ],
//     totalPrice: { type: Number, required: true },
//     status: { type: String, default: "active" },
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Order", OrderSchema);
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [
        {
            name: String,
            amount: Number,
            image: String,
            price: Number,
            product: String,
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "active" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);