import React, { Component } from "react";
import axios from "axios";

class CreateCoffee extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            description: "",
            price: 0,
            file: null
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeFile(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const file = document.getElementById("inputGroupFile01").files;
        const formData = new FormData();

        formData.append("img", file[0]);

        const coffee = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            file: this.state.file,
        }

        console.log(coffee);

        axios.post("http://localhost:5000/coffee/add", coffee)
            .then(res => console.log(res.data));  

        window.location = "/";
    }

    render() {
        return (
            <div>
                <h1>Create a new coffee</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Name: </label>
                    <input 
                        type="text"
                        required
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />
                    <label>Picture: </label>
                    <input
                        type="file"
                        id="inputGroupFile01"
                    />
                    <label>Description: </label>
                    <input 
                        type="text"
                        required
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                    <label>Price: </label>
                    <input 
                        type="text"
                        required
                        value={this.state.price}
                        onChange={this.onChangePrice}
                    />
                    <div>
                        <input type="submit" value="Create Coffee" />
                    </div>
                </form>
            </div>
        )
    }
};

export default CreateCoffee;