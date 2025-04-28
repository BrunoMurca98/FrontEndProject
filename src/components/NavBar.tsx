import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"; // Optional: Add styles for the NavBar

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/Games" className="navbar-link">
                        Games
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/Favorites" className="navbar-link">
                        Favorites
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;