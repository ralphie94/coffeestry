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

    render() {
        return (
            <div>
                <ul>
                    <li><h1>{this.state.coffee.name}</h1></li>
                    <li><img className="coffee-show" src={`http://localhost:5000/${this.state.coffee.coffeeImage}`} alt="" /></li>
                    <li><p>{this.state.coffee.description}</p></li>
                    <li>${this.state.coffee.price}</li>
                </ul>
                <button>Add to cart</button>
            </div>
        )
    }
};

export default CoffeeShow;