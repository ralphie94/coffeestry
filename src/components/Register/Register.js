import React, { Component } from "react";
import { Redirect } from "react-router-dom";

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
        fetch ("/users", {
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
    <h1>Register</h1>
    <input onChange={changeHandler} type="text" name="username" placeholder="Username" value={username}></input><br/>
    <input onChange={changeHandler} type="password" name="password" placeholder="Password" value={password}></input><br/>
    <input onChange={changeHandler} type="text" name="email" placeholder="Email" value={email}></input><br/>
    <button type="submit" value="Submit">Submit</button>
   
</form>
</div>

export default Register;