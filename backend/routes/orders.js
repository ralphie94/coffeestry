const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuth, isAdmin } = require("../util");

const Order = require("../models/Order");
const Coffee = require("../models/Coffee");
const User = require("../models/User");

router.get("/", (req, res, next) => {
    Order.find()
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

router.get("/:orderId", (req, res, next) => {
    Order.findById()
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

router.post("/cart", (req, res, next) => {
    Coffee.findById(req.body.coffeeId)
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        coffee: req.body.coffeeId
    });

    return order.save()

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