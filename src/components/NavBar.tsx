import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/Login");
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
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
                <li className="navbar-item">
                    <button onClick={handleLogout} className="navbar-link">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;