import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import "./CoffeeShow.css";

class CoffeeShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coffee: {}
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/coffee/${this.props.match.params.id}`)
            .then(coffee => {
                this.setState({ coffee: coffee.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async addCoffee(){

        const order = {
            coffee: this.state.coffee._id
        }

        let res = await axios.post("http://localhost:5000/orders/cart", order, {
            headers:{
                "Content-Type": "application/json"
            }
    })
        .then(res => console.log(res.data));

        this.props.history.push(`/cart/${this.props.currentUser._id}`);
    }

    render() {
        return (   
            <div className="coffee-show-container">
                    <ul>
                        <li><img className="coffee-show" src={`http://localhost:5000/${this.state.coffee.coffeeImage}`} alt="" /></li>
                        <div className="coffee-info">
                            <li><h1 className="coffee-name">{this.state.coffee.name}</h1></li>
                            <li><p>{this.state.coffee.description}</p></li>
                            <li>${this.state.coffee.price}</li>
                            <button value="Submit" onClick={() => {this.addCoffee(this.state.coffee)}}>Add to cart</button>
                        </div>
                    </ul>
            </div>
        )
    }
};

export default withRouter(CoffeeShow);