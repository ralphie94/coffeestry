import React, { Component } from "react";
import axios from "axios";

const Coffee = props => (
    <ul>
        <li>{props.coffee.name}</li>
        <li>{props.coffee.file}</li>
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
            .then(response => {
                this.setState({ coffee: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // coffeeList() {
    //     return this.state.coffee.map(currentCoffee => {
    //         return <Coffee coffee={currentCoffee} key={currentCoffee._id}/>;
    //     })
    // }

    render() {
        return (
            <div>
                <h1>Coffee</h1>
                <ul>
                    <li>
                        {/* { this.coffeeList() } */}
                    </li>
                </ul>
            </div>
        )
    }
};

export default CoffeeList;