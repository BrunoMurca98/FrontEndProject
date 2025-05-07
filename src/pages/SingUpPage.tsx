import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Sign-up successful");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleBackToLogin = () => {
        navigate("/Login");
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSignUp}>
                <h1 className="login-title">Sign Up</h1>
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
                        onClick={handleBackToLogin}
                    >
                        Back to Login
                    </button>
                    <button type="submit" className="login-button">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;