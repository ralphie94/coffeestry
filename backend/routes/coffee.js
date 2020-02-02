const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Coffee = require("../models/Coffee");

router.get("/", async (req, res) => {
    Coffee.find()
        .select("name description price _id coffeeImage")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                coffee: docs.map(doc => {
                    return {
                        name: doc.name,
                        description: doc.description,
                        price: doc.price,
                        coffeeImage: doc.coffeeImage,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/coffee/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/add", upload.single("coffeeImage"), (req, res, next) => {
    const coffee = new Coffee({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        coffeeImage: req.file.path
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

router.delete("/:id", (req, res) => {
    Coffee.findByIdAndDelete(req.params.id)
        .then(() => res.json("Coffee deleted."))
        .catch(err => res.status(400).json("Error: " + err))
});

module.exports = router;