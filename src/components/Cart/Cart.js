import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Cart.css";

const Coffee = props => (
    <div className="cart-container">
        <ul>
            <hr></hr>
            <div className="list-container">
                <div className="img-name-price">
                    <div>
                        <li><Link to={"/coffee/"+props.coffee._id}><img className="cart-coffee" src={`http://localhost:5000/${props.coffee.coffee.coffeeImage}`} alt="" /></Link></li>
                    </div>
                    <div className="name-remove">
                        <li><h3 className="cart-coffee-name">{props.coffee.coffee.name}</h3></li>
                        <li><button className="remove-btn" onClick={() => { props.removeCoffee(props.coffee._id) }}>REMOVE</button></li>
                    </div>
                </div>
                <div className="quan-price">
                    <li><input type="text" className="quantity-field" name="quantity"></input></li>
                    <li><p className="cart-price">${props.coffee.coffee.price}</p></li>
                </div>
            </div>
        </ul>
    </div>
)

class Cart extends Component {
    constructor(props){
    super(props)

        this.removeCoffee = this.removeCoffee.bind(this)

    this.state = {
        coffee: []
    };
}

componentDidMount() {
    axios.get("http://localhost:5000/orders/")
        .then(coffee => {
            this.setState({ coffee: coffee.data.orders })
        })
        .catch((error) => {
            console.log(error);
        })
}

    coffeeCartList() {
        return this.state.coffee.map(currentcoffee => {
            return <Coffee coffee={currentcoffee} removeCoffee={this.removeCoffee} key={currentcoffee._id} />;
        })
    }

    removeCoffee(id) {
        axios.delete("http://localhost:5000/orders/"+id)
            .then(response => { console.log(response.data)});

        this.setState({
            coffee: this.state.coffee.filter(el => el._id !== id)
        })
    }

    render() {
        return(
            <div>
                {this.state.coffee && this.props.currentUser ? 
                <div>
                    <h1 className="user-cart-title">YOUR CART</h1>
                    <h4 className="product-cart">PRODUCT</h4>
                    <h4 className="quantity-cart">QUANTITY</h4>
                    <h4 className="total-cart">TOTAL</h4>
                    {this.coffeeCartList() }
                    <hr className="bottom-line"></hr>
                    <div className="cart-buttons">
                        <button className="continue-btn"> CONTINUE SHOPPING</button>
                        <button className="checkout-btn"> CHECKOUT</button>
                    </div>
                </div>
                 :
                <div className="your-cart-text">
                    <h1 style={{ fontSize: "48px", fontFamily: "Raleway" }}>YOUR CART</h1>
                    <p style={{ marginTop: "30px" }}>Your cart is currently empty. Go buy some coffee!</p>
                </div>
                }
            </div>
        )
    }
};

export default withRouter(Cart);