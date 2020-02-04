import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

class Navbar extends Component {
    render() {
        return (
            <header>
            <div className="nav-continer">
                <h1 className="nav-title">Organic Coffeestry</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create">Create New Coffee</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </nav>
            </div>
            </header>
        )
    }
}

export default Navbar;