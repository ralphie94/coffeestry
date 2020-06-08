const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/Order");
const Coffee = require("../models/Coffee");
const User = require("../models/User");

router.get("/", async (req, res, next) => {
    let foundUser = "5e51bbfe25ee70fe7e13891b";
    User.find( req.params.orderId )
      .select("coffee quantity _id")
      .populate('coffee', 'name price coffeeImage')
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              _id: doc._id,
              coffee: doc.coffee,
              quantity: doc.quantity,
              foundUser,
              request: {
                type: "GET",
                url: "http://localhost:5000/orders/" + doc._id
              }
            };
          })
        });
        console.log(foundUser);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

router.get("/:orderId", (req, res, next) => {
    Order.findById(req.params.orderId)
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
        res.status(200).json({
            order: order,
            request: {
                type: "GET",
                url: "http://localhost:5000/orders"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post("/cart", async (req, res) => {
    try {
        await Coffee.findById(req.body.coffeeId)
        const foundUser = await "5e51bbfe25ee70fe7e13891b";
        // await Order.findOne({ foundUser });

        const order = new Order ({
            _id : mongoose.Types.ObjectId(),
            coffee: req.body.coffee,
            quantity: req.body.quantity,
            foundUser
        })

        User.findByIdAndUpdate(
            {_id: "5e51bbfe25ee70fe7e13891b"},
            {
                $push:
                {
                    userCart: order
                }
            }
        )
        
        return res.status(201).send(order);
        
        
    } catch(err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

router.delete("/:orderId", (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:5000/orders",
                    body: { coffeeId: "ID", quantity: "Number" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;