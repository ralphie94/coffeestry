import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Cart.css";

const Coffee = props => (
    <ul>
      <li><h3>{props.coffee.name}</h3></li>
      <li><Link to={"/coffee/"+props.coffee._id}><img className="coffee" src={`http://localhost:5000/${props.coffee.coffeeImage}`} alt="" /></Link></li>
      <li><p>{props.coffee.description}</p></li>
      <li><p>${props.coffee.price}</p></li>
      <li><a href="#" onClick={() => { props.removeCoffee(props.coffee._id) }}>Delete</a></li>
    </ul>
)

class Cart extends Component {
    constructor(props) {
        super(props);

        this.removeCoffee = this.removeCoffee.bind(this);

        this.state = {
            coffeeCart: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/orders/")
            .then(coffee => {
                this.setState({ coffeeCart: coffee.data.coffee })
            })
            .catch((error) => {
                console.log(error);
            })
            console.log(this.state.coffeeCart);
    }

    coffeeCartList() {
        return this.state.coffeeCart.map(currentcoffee => {
            return <Coffee coffee={currentcoffee} removeCoffee={this.removeCoffee} key={currentcoffee._id} />;
        })
    }

    removeCoffee(id) {
        axios.delete("http://localhost:5000/orders/"+id)
            .then(response => { console.log(response.data)});

        this.setState({
            coffeeCart: this.state.coffeeCart.filter(el => el._id !== id)
        })
    }

    render() {
        return(
            <div className="cart-container">
                {this.state.coffeeCart ? (
                    this.coffeeCartList() 
                ) :
                <div>
                    <h1>Your cart</h1>
                    <p>Your cart is currently empty. Go buy some coffee!</p>
                </div>
                }
            </div>
        )
    }
};

export default Cart;