import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import CreateCoffee from "./components/CreateCoffee/CreateCoffee";
import CoffeeList from "./components/CoffeeList/CoffeeList";
import CoffeeShow from "./components/CoffeeShow/CoffeeShow";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import "./App.css";

class App extends Component {
  state = {
    currentUser: null,
    sideDrawerOpen: false
  };

  doSetCurrentUser = user =>
    this.setState({
      currentUser: user
  });

  drawerTogglerClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <div>
        <Router>
        <Navbar drawerClickHandler={this.drawerTogglerClickHandler} currentUser={this.state.currentUser} />
        <SideDrawer show={this.state.sideDrawerOpen} click={this.backdropClickHandler} currentUser={this.state.currentUser} />
        {backdrop}
          <div className="container">
            <Route path="/" exact component={CoffeeList} />
            <Route path="/create" component={CreateCoffee} />
            <Route path="/cart" component={Cart} />
            <Route path="/coffee/:id" component={CoffeeShow} />
            <Route
              path='/login'
              render={() => (
                <Login
                  currentUser={this.state.currentUser}
                  doSetCurrentUser={this.doSetCurrentUser}
                />
              )}
            />
            <Route
              path='/register'
              render={() => (
                <Register
                  currentUser={this.state.currentUser}
                  doSetCurrentUser={this.doSetCurrentUser}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
