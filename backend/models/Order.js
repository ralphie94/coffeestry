const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coffee: { type: mongoose.Schema.Types.ObjectId, ref: "Coffee", required: true },
    quantity: { type: Number, default: 1 },
    coffeeCart: [Object]
});

module.exports = mongoose.model("Order", orderSchema);