import React, { Component } from "react"

import "./Banner.css";
import Image from "../../images/coffee-pour.jpeg";

class Banner extends Component {
    render() {
        return(
            <div className="banner">
                <div className="banner-text">
                    <h1>Organic Coffeestry</h1>
                </div>
            </div>
        )
    }
};

export default Banner;