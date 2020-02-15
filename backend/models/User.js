const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    coffee: { type: mongoose.Schema.Types.ObjectId, ref: "Coffee", required: true },
    quantity: { type: Number, default: 1 },
    userCart: [Object]
})

module.exports = mongoose.model("User", UserSchema);