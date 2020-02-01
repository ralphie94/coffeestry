const mongoose = require("mongoose");

const CoffeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const Coffee = mongoose.model("Coffee", CoffeeSchema);

module.exports = Coffee;