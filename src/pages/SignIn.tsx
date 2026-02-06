import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";
import { signIn } from "../services/authService";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    
    try {
      const response = await signIn({ email, password });
      localStorage.setItem("token", response.data.token);
      login(response.data.user);
      alert("Sign in successful!");
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Sign in failed. Please check your credentials and try again.";
      alert(errorMessage);
      console.error('Sign in error:', error.response?.data);
    }
  };



  return (
    <div className="auth-container main-content">
      <div className="auth-wrapper">
        <div className="auth-form">
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
