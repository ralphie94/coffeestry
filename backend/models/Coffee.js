const mongoose = require("mongoose");

const CoffeeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    coffeeImage: { type: String, required: true },
    coffeeId: Number
});

const Coffee = mongoose.model("Coffee", CoffeeSchema);

module.exports = Coffee;