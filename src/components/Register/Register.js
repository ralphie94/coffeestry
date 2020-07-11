import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./Register.css";

class Register extends Component {
    state = {
        username: "",
        password: "",
        email: "",
        logged: false,
        message: ""
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        fetch ("http://coffeestry:5000/users", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers:{
                "Content-type" : 'application/json'
            }
        })
        .then(results => results.json())
        .then(data => this.setState({data: data, logged: true}))
    }

    render(){
        const  { username, password, email } = this.state
        return (
            <div>
                {
                    this.state.logged
                    ? <Redirect to={`/`}/>
                    : <RegisterForm 
                    changeHandler={this.changeHandler} 
                    handleSubmit={this.handleSubmit} 
                    username={username} 
                    password={password} 
                    email={email}/>
                }
            </div>
           
        )
    }
}
const RegisterForm = ({changeHandler, handleSubmit, username, password, email}) =>
<div>
<form onSubmit={e => handleSubmit(e)}>
    <div className="login-container">
        <h1 className="register-title">Register</h1>
        <h2 className="username">Username</h2>
        <input onChange={changeHandler} type="text" className="name-register" name="username" value={username}></input><br/>
        <h2 className="password">Password</h2>
        <input onChange={changeHandler} type="password" className="password-register" name="password" value={password}></input><br/>
        <h2 className="email">Email</h2>
        <input onChange={changeHandler} type="text" className="email-box" name="email" value={email}></input><br/>
        <button type="submit" className="register-btn" value="Submit">CREATE</button>
    </div>
</form>
</div>

export default Register;
