import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {

    state = {
        username: "",
        password: "",
        logged: false,
        message: ""
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        const loginResponse = await fetch ("/users/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers:{
                "Content-type" : "application/json"
            }
        })
        const parsedResponse = await loginResponse.json();
        if(parsedResponse.success) {
            this.props.doSetCurrentUser(parsedResponse.user)
            this.setState({
                logged: true
            })
        } else {
            console.log("HIT ELSE")
            this.setState({
                message: "Try again!"
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        })
    };

    render() {
        const { username, password, message } = this.state
        const { currentUser } = this.props
        return(
            <div>
                {
                currentUser && currentUser.isAdmin
                ? (<Redirect to={`/create`} />
                ) : (currentUser ? <Redirect to={`/`} />
                : <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                    <h3>{message}</h3>
                    <input type="text" name="username" placeholder="Username" autoComplete="off" value={username} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} /><br/>
                    <button type="submit" value="Submit">Login</button>
                </form>
                )}
            </div>
        )
    }
};

export default Login;