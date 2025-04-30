import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/Login" className="navbar-link">
                        Login
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/Search" className="navbar-link">
                        Search
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