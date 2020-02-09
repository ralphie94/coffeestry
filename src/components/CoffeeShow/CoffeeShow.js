import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom"

import "./CoffeeShow.css";

class CoffeeShow extends Component {
    constructor(props) {
        super(props);

        this.addCoffee = this.addCoffee.bind(this);

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

    addCoffee = async (coffee) => {
        try{
            const response = await fetch("/orders",{
                method:"POST",
                credentials:"include",
                body:JSON.stringify(coffee),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await response.json()
            if(parsedResponse.success){
                this.props.history.push("/cart")
            }

        }catch(err){
            console.log(err)
        }
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
                            <button value="Submit" onClick={() =>{this.addCoffee(this.state.coffee)}}>Add to cart</button>
                        </div>
                    </ul>
            </div>
        )
    }
};

export default withRouter(CoffeeShow);