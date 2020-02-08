import React, { Component } from "react";
import { Link } from "react-router-dom";

import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

import "./Navbar.css";
import Logo from "../../images/organic-coffeestry.png";

class Navbar extends Component {
    render() {
        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="logo">
                        <Link to="/"><img className="nav-title" src={Logo} /></Link>
                    </div>
                    <div className="toolbar_navigation-items">
                        <ul className="nav-links">
                            <li><Link className="link" to="/">Home</Link></li>
                            {
                                !this.props.currentUser && <li><Link className="link" to="/login">Login</Link></li>
                            }
                            <li><Link className="link" to="/create">Create New Coffee</Link></li>
                            <li><Link className="link" to="/cart">Cart</Link></li>
                        </ul>
                    </div>
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                </nav>
            </header>
        )
    }
}

export default Navbar;