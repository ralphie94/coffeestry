import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import CreateCoffee from "./components/CreateCoffee/CreateCoffee";

function App() {
  return (
    <div>
      <h1>Organic Coffeestry</h1>
      <Router>
        <div className="container">
          <Navbar />
          <Route path="/" />
          <Route path="/create" component={CreateCoffee} />
        </div>
      </Router>
    </div>
  );
}

export default App;
