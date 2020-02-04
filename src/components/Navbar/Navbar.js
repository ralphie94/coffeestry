import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

class Navbar extends Component {

    render() {
        const navSlide = () => {
            const burger = document.querySelector(".burger");
            const nav = document.querySelector(".nav-links");
            const navLinks = document.querySelectorAll(".nav-links li");
        
            burger.addEventListener("click", () => {
                nav.classList.toggle("nav-active");
    
                navLinks.forEach((link, index) => {
                    if(link.style.animation) {
                        link.style.animation = ""
                    } else {
                        link.style.animation = link.getElementsByClassName.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1}s`;
                    }
                });
                burger.classList.toggle("toggle");
            });
    
        }
        return (
            <nav>
                <div className="logo">
                    <h1 className="nav-title">Organic Coffeestry</h1>
                </div>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create">Create New Coffee</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                    <div onClick={() => navSlide()} className="burger">
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
            </nav>
        )
    }
}

export default Navbar;