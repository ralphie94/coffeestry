const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coffee: { type: mongoose.Schema.Types.ObjectId, ref: "Coffee", required: true },
    quantity: { type: Number, default: 1 },
    foundUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    active: { type: Boolean, default: true },
    userCart: [Object]
});

module.exports = mongoose.model("Order", orderSchema);