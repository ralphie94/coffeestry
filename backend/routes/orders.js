const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/Order");
const Coffee = require("../models/Coffee");
const User = require("../models/User");

router.get("/", async (req, res, next) => {
    let foundUser = await User.findById(req.session.userId);
    Order.find({ foundUser })
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

router.post("/cart", async (req, res) => {
    const { coffeeId, quantity } = req.body

    try {
        const foundUser = await User.findById(req.session.foundUser);
        let cart = await Order.findOne({ foundUser });

        if (cart) {
            let itemIndex = cart.coffee.findIndex(c => c.coffeeId == coffeeId);

            if (itemIndex > -1) {
                let coffeeItem = cart.coffee[itemIndex];
                coffeeItem.quantity = quantity;
                cart.coffee[itemIndex] = coffeeItem;
            } else {
                cart.coffee.push({ coffeeId, quantity });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            const newCart = await Order.create({
                _id: mongoose.Types.ObjectId(),
                foundUser,
                coffee: [{ coffeeId, quantity }]
            });
            console.log(foundUser);
            
            return res.status(201).send(newCart);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
})

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