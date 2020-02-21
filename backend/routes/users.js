const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

router.post("/", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
        });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "User created"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
        }
    });
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