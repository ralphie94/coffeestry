import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import "./Cart.css";

const Coffee = props => (
    <ul>
      <li><h3>{props.coffee.coffee[0].name}</h3></li>
      <li><Link to={"/coffee/"+props.coffee.coffee._id}><img className="coffee" src={`http://localhost:5000/${props.coffee.coffee[0].coffeeImage}`} alt="" /></Link></li>
      <li><p>${props.coffee.coffee[0].price}</p></li>
      <li><a href="#" onClick={() => { props.removeCoffee(props.coffee.coffee[0]._id) }}>Delete</a></li>
    </ul>
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
            <div className="cart-container">
                {this.state.coffee ? (
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

export default withRouter(Cart);