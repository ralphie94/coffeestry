import React, { Component } from "react";
import axios from "axios";

const Coffee = props => (
    <ul>
      <li><h1>{props.coffee.name}</h1></li>
      <li><img src={`http://localhost:5000/${props.coffee.coffeeImage}`} style={{width: "150px"}}/></li>
      <li><p>{props.coffee.description}</p></li>
      <li><p>{props.coffee.price}</p></li>
      <li><button>Add to cart</button></li>
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
                    { this.coffeeList() }
            </div>
        )
    }
};

export default CoffeeList;