const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    coffeeImage: { type: String, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coffee",
        required: true
    },
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);