const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coffee: { type: mongoose.Schema.Types.ObjectId, ref: "Coffee" },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model("Order", orderSchema);