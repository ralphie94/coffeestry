import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import CreateCoffee from "./components/CreateCoffee/CreateCoffee";
import CoffeeList from "./components/CoffeeList/CoffeeList";
import CoffeeShow from "./components/CoffeeShow/CoffeeShow";
import Cart from "./components/Cart/Cart";

import "./App.css";

class App extends Component {
  state = {
    currentUser: null
  }

  doSetCurrentUser = user =>
    this.setState({
      currentUser: user
    });

  render() {
    return (
      <div>
        <Router>
          <div className="container">
            <Navbar />
            <Route path="/" exact component={CoffeeList} />
            <Route path="/create" component={CreateCoffee} />
            <Route path="/cart" component={Cart} />
            <Route path="/coffee/:id" component={CoffeeShow} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
