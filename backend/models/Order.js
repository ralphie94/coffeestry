const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coffee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coffee", required: true }],
    quantity: { type: Number, default: 1 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Order", orderSchema);