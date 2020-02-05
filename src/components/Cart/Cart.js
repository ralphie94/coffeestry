import React, { Component } from "react";
import axios from "axios";

import "./Cart.css";

class Cart extends Component {
    render() {
        return(
            <div className="cart-container">
                <h1>Your cart</h1>
                <p>Your cart is currently empty. Go buy some coffee!</p>
            </div>
        )
    }
};

export default Cart;