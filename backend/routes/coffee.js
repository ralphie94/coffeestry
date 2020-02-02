const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({storage: storage});

const Coffee = require("../models/Coffee");

router.get("/", async (req, res) => {
    try {
        const coffee = await Coffee.find({})
        res.json({ coffee });
    } catch(err) {
        res.json(err);
    }
});

router.post("/", upload.single("coffeeImage"), (req, res, next) => {
    const coffee = new Coffee({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    coffee
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created coffee successfully",
                createdCoffee: {
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/coffee/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;