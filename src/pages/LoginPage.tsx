import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            navigate("/Search");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleSignUpRedirect = () => {
        navigate("/SignUp");
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="login-title">Login</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="button-group">
                    <button
                        type="button"
                        className="signup-button"
                        onClick={handleSignUpRedirect}
                    >
                        Sign Up
                    </button>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;