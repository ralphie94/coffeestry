import React from "react";
import { Link } from "react-router-dom";

import "./SideDrawer.css";

const sideDrawer = props => {
    let drawerClasses = "side-drawer";
    if (props.show) {
        drawerClasses = "side-drawer open";
    }
    return(
        <nav className={drawerClasses}>
            <ul>
                <li><Link className="link" to="/" onClick={props.click}>Home</Link></li>
                {
                    !props.currentUser && <li><Link className="link" to="/login" onClick={props.click}>Login</Link></li>
                }
                <li><Link className="link" to="/create" onClick={props.click}>Create New Coffee</Link></li>
                {
                    props.currentUser && <li><Link className="link" to={`/cart/${props.currentUser._id}`} onClick={props.click}>Cart</Link></li>
                }
            </ul>
        </nav>
    );
};

export default sideDrawer;