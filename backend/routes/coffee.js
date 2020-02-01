const express = require('express');
const router = express.Router();

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
    try {
        const coffee = await Coffee.create(req.body)
        res.json({
            coffee,
            success: coffee ? true : false
        })
    } catch(err) {
        res.json({err});
    }
});

module.exports = router;