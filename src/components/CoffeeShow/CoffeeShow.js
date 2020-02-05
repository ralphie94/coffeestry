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
            <div className="coffee-show-container">
                <ul>
                    <li><img className="coffee-show" src={`http://localhost:5000/${this.state.coffee.coffeeImage}`} alt="" /></li>
                    <div className="coffee-info">
                        <li><h1 className="coffee-name">{this.state.coffee.name}</h1></li>
                        <li><p>{this.state.coffee.description}</p></li>
                        <li>${this.state.coffee.price}</li>
                        <button>Add to cart</button>
                    </div>
                </ul>
            </div>
        )
    }
};

export default CoffeeShow;