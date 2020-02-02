import React, { Component } from "react";
import axios from "axios";

const Coffee = props => (
    <tr>
      <td>{props.coffee.name}</td>
      <td>{props.coffee.coffeeImage}</td>
      <td>{props.coffee.description}</td>
      <td>{props.coffee.price}</td>
    </tr>
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
                <table>
                <thead className="thead-light">
                    <tr>
                    <th>Name</th>
                    <th>Coffee Image</th>
                    <th>Description</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    { this.coffeeList() }
                    {this.props.coffeeImage && <img src={this.props.coffeeImage} />}
                </tbody>
                </table>
            </div>
        )
    }
};

export default CoffeeList;