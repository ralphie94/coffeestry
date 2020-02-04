const express = require('express');
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
    try {
        const users = await User.find({})
        res.json({ users });
    } catch(err) {
        res.json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json({user})
    } catch(err) {
        res.json({err})
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json({
            user,
            success: user ? true : false
        })
    } catch(err) {
        res.json({err})
    }
});

router.post("/login", async (req, res) => {
    console.log("hit");
    try {
        const foundUser = await User.findOne({username: req.body.username})
        req.session.userId = foundUser._id
        res.json({
            user: foundUser,
            success: foundUser ? true : false
        })
    } catch(err) {
        res.json({err})
    }
});

module.exports = router;