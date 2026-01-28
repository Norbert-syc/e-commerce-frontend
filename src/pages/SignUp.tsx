import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { signUp } from "../services/authService";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        
        try {
            await signUp({ name, email, password });
            alert("Sign up successful! Please sign in.");
            navigate("/signin");
        } catch (error: any) {
            console.error("Sign up error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Sign up failed. Please try again.";
            alert(errorMessage);
        }
    };


    return (
        <div className="auth-container main-content">
            <div className="auth-wrapper">
                <div className="auth-form">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignUp}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="signup-btn">
                            Sign Up
                        </button>
                    </form>
                    
                    <div className="auth-footer">
                        <p>
                            Already have an account? <Link to="/signin">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default SignUp;