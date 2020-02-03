import React, { Component } from "react";
import axios from "axios";

const Coffee = props => (
    <ul>
      <li>{props.coffee.name}</li>
      <li><img src={`http://localhost:5000/${props.coffee.coffeeImage}`} /></li>
      <li>{props.coffee.description}</li>
      <li>{props.coffee.price}</li>
    </ul>
)

class CoffeeList extends Component {
    constructor(props) {
        super(props);

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

    coffeeList() {
        return this.state.coffee.map(currentcoffee => {
            return <Coffee coffee={currentcoffee} key={currentcoffee._id} />;
        })
    }

    render() {
        return (
            <div>
                <h1>Coffee</h1>
                <ul>
                    <li>
                        { this.coffeeList() }
                    </li>
                </ul>
            </div>
        )
    }
};

export default CoffeeList;