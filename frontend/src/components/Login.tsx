import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    // Simulate successful login
    console.log("Logging in with:", form);
    navigate("/"); 
  };

  return (
    <>
      {/* NAVBAR — Matches home and signup */}
      <div className="navbar-wrapper">
        <nav className="nav-left">
          <a href="/Home">Home</a>
          <a href="/create-workflow">Product</a>
          <a href="/documentation">Documentation</a>
          <a href="/https://github.com/deepanshu-QM/Quant-n8n">GitHub</a>
        </nav>
        <nav className="nav-right">
          <a href="/signup">Signup</a>
          <a href="/contact" className="btn-contact">Contact Us</a>
        </nav>
      </div>

      {/* LOGIN PAGE */}
      <div className="login-page">

        {/* LEFT PANEL */}
        <div className="login-left">
          <div className="login-left-inner">
            <h1 className="login-brand">Welcome Back.</h1>
            <p className="login-brand-sub">
              Log in to access your automated workflows, portfolio insights, and real-time market data.
            </p>

            <div className="login-features">
              <div className="login-feature-item">
                <span className="login-feature-dot" />
                Resume your visual workflows
              </div>
              <div className="login-feature-item">
                <span className="login-feature-dot" />
                Track live social signals
              </div>
              <div className="login-feature-item">
                <span className="login-feature-dot" />
                Manage API connections
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-tag">Secure Login</span>
            <h2 className="login-form-title">Log in to Quant A.I.</h2>
            <p className="login-form-sub">
              Don't have an account?{" "}
              <a href="/signup" className="login-link">Sign up</a>
            </p>

            <div className="login-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-forgot">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-btn">
              Sign In →
            </button>
          </form>
        </div>
        
      </div>
    </>
  );
};

export default Login;