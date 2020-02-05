import React, { Component } from "react";
import axios from "axios";

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

    onSubmit = (e) => {
        e.preventDefault();

        const coffee = {
            name: this.state.name,
            coffeeImage: this.state.coffeeImage,
            description: this.state.description,
            price: this.state.price
        }

        axios.post(`http://localhost:5000/coffee/${this.props.match.params.id}`, coffee)
            .then(res => console.log(res.data));  

        window.location = "/cart";
    }

    render() {
        return (
            <div className="coffee-show-container">
                <form onSubmit={this.onSubmit}>
                    <ul>
                        <li><img className="coffee-show" src={`http://localhost:5000/${this.state.coffee.coffeeImage}`} alt="" /></li>
                        <div className="coffee-info">
                            <li><h1 className="coffee-name">{this.state.coffee.name}</h1></li>
                            <li><p>{this.state.coffee.description}</p></li>
                            <li>${this.state.coffee.price}</li>
                            <input type="submit" value="Add to cart" />
                        </div>
                    </ul>
                </form>
            </div>
        )
    }
};

export default CoffeeShow;