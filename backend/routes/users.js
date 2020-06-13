const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { getToken, isAuth } = require("../util");

const User = require("../models/User");
const Coffee = require("../models/Coffee");
const Order = require("../models/Order");

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
                    message: "User created",
                    token: getToken(user)
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
        if(foundUser.validPassword(req.body.password)){
            req.session.userId = foundUser._id;
            console.log(req.session.userId);
            
            res.json({
                status: 200,
                user: foundUser,
                success: foundUser ? true : false,
                message: "Login Successful",
                token: getToken(foundUser)
            })
        } else {
            req.session.message = "The login information does not match our records. Please try again."
            res.json({
                data: "Invalid Password",
                message: req.session.message
            })
        }
    } catch(err) {
        res.json({
            error: err,
            message: "The username or password does not match our records. Please try again."
        })
    }
});

router.post("/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.json({
            message: "You have logged out."
        })
    } catch(err) {
        res.json({
            error: err
        })
    }
});

module.exports = router;