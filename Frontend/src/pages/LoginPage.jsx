import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login functionality (replace with real API call)
        if (email === "test@example.com" && password === "password") {
            alert("Login Successful!");
            navigate("/dashboard"); // Redirect to dashboard or another page
        } else {
            alert("Invalid email or password");
        }
    };

    const redirectToSignup = () => {
        navigate("/signup"); // Redirect to the Signup component
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-header">Login</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-footer">
                    <p>
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="redirect-button"
                            onClick={redirectToSignup}
                        >
                            Sign up
                        </button>
                    </p>
                    <p>
                        Forgot your password?{" "}
                        <a href="/reset-password">Reset it</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
