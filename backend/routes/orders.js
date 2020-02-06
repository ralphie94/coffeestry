const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/Order");
const Coffee = require("../models/Coffee");

router.get("/", (req, res, next) => {
    Order.find()
      .select("coffee quantity _id")
      .populate('coffee', 'name')
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              coffee: doc.coffee,
              quantity: doc.quantity,
              request: {
                type: "GET",
                url: "http://localhost:5000/orders/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

router.post("/", (req, res, next) => {
    Coffee.findById(req.body.coffeeId)
    .then(coffee => {
      if (!coffee) {
        return res.status(404).json({
          message: "Coffee not found"
        });
    }
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        coffee: req.body.coffeeId
    });
        return order.save()
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Order stored",
            createdOrder: {
                _id: result._id,
                coffee: result.coffee,
                quantity: result.quantity
            },
            request: {
                type: "GET",
                url: "http://localhost:5000/orders/" + result._id
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