import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./CoffeeList.css";

const Coffee = props => (
    <ul>
      <li><h1>{props.coffee.name}</h1></li>
      <li><Link to={"/coffee/"+props.coffee._id}><img className="coffee" src={`http://localhost:5000/${props.coffee.coffeeImage}`} alt="" /></Link></li>
      <li><p>{props.coffee.description}</p></li>
      <li><p>${props.coffee.price}</p></li>
      <li><a href="#" onClick={() => { props.deleteCoffee(props.coffee._id) }}>Delete</a></li>
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
                <h1>Coffee</h1>
                <div className="coffee-list">
                    { this.coffeeList() }
                </div>
            </div>
        )
    }
};

export default CoffeeList;