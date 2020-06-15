import React, { Component } from "react";
import axios from "axios";

import "./CreateCoffee.css";

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
        const formData = new FormData();

        formData.append("coffeeImage", this.state.file);
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("price", this.state.price);

        const coffee = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            file: this.state.file,
        }

        console.log(coffee);

        axios.post("http://localhost:5000/coffee/add", formData, coffee)
            .then(res => console.log(res.data));  

        window.location = "/";
    }

    render() {
        return (
            <div className="login-container">
                <h1 className="create-title">Create Coffee</h1>
                <form onSubmit={this.onSubmit} enctype="multipart/form-data">
                    <h2 className="create-name">Name</h2>
                    <input 
                        className="name-field"
                        type="text"
                        required
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />
                    <h2 className="create-pic">Picture</h2>
                    <input
                        className="image-field"
                        type="file"
                        required
                        name="coffeeImage"
                        onChange={this.onChangeFile}
                    />
                    <h2 className="create-desc">Description</h2>
                    <input 
                        className="desc-field"
                        type="text"
                        required
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                    <h2 className="create-price">Price</h2>
                    <input 
                        className="price-field"
                        type="text"
                        required
                        value={this.state.price}
                        onChange={this.onChangePrice}
                    />
                    <div className="create-btn-container">
                        <input className="create-btn" type="submit" value="Create Coffee" />
                    </div>
                </form>
            </div>
        )
    }
};

export default CreateCoffee;