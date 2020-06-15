import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Banner from "../Banner/Banner";

import "./CoffeeList.css";

const Coffee = props => (
    <ul>
    <div className="main-coffee">
        <li><Link to={"/coffee/"+props.coffee._id}><img className="coffee" src={`http://localhost:5000/${props.coffee.coffeeImage}`} alt="" /></Link></li>
        <li><h3 className="main-coffee-name">{props.coffee.name}</h3></li>
        <li><p className="main-price">${props.coffee.price}</p></li>
    </div>
    </ul>
)

class CoffeeList extends Component {
    constructor(props) {
        super(props);

        this.deleteCoffee = this.deleteCoffee.bind(this);

        this.state = {
            coffee: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/coffee/")
            .then(coffee => {
                this.setState({ coffee: coffee.data.coffee })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteCoffee(id) {
        axios.delete("http://localhost:5000/coffee/"+id)
            .then(response => { console.log(response.data)});

        this.setState({
            coffee: this.state.coffee.filter(el => el._id !== id)
        })
    }

    coffeeList() {
        return this.state.coffee.map(currentcoffee => {
            return <Coffee coffee={currentcoffee} deleteCoffee={this.deleteCoffee} key={currentcoffee._id} />;
        })
    }

    render() {
        return (
            <div>
                <Banner />
                <h1 className="selections">Selections</h1>
                <div className="coffee-list">
                    { this.coffeeList() }
                </div>
            </div>
        )
    }
};

export default CoffeeList;