import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./Login.css";

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
            <div className="login-background">
                {
                currentUser && currentUser.isAdmin
                ? (<Redirect to={`/create`} />
                ) : (currentUser ? <Redirect to={`/`} />
                : <form onSubmit={this.handleSubmit}>
                <h1 className="login-title">Login</h1>
                    <h3 className="error-msg">{message}</h3>
                    <h2 className="login-name">Username</h2>
                    <input type="text" className="name-box" name="username" autoComplete="off" value={username} onChange={this.handleChange} />
                    <h2 className="login-password">Password</h2>
                    <input type="password" className="password-box" name="password" value={password} onChange={this.handleChange} /><br/>
                    <button type="submit" className="login-btn" value="Submit">SIGN IN</button>
                    <p className="register-link"><a href="/register">Don't have an account yet?</a></p>
                </form>
                )}
            </div>
        )
    }
};

export default Login;