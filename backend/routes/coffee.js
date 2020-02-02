const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Coffee = require("../models/Coffee");

router.get("/", async (req, res) => {
    try {
        const coffee = await Coffee.find({})
        res.json({ coffee });
    } catch(err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
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