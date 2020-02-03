import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import CreateCoffee from "./components/CreateCoffee/CreateCoffee";
import CoffeeList from "./components/CoffeeList/CoffeeList";
import CoffeeShow from "./components/CoffeeShow/CoffeeShow";

function App() {
  return (
    <div>
      <h1>Organic Coffeestry</h1>
      <Router>
        <div className="container">
          <Navbar />
          <Route path="/" exact component={CoffeeList} />
          <Route path="/create" component={CreateCoffee} />
          <Route path="/coffee" component={CoffeeShow} />
        </div>
      </Router>
    </div>
  );
}

export default App;
