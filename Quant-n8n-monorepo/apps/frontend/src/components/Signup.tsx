import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.username || !form.email) {
      setError("Please fill in all fields.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setStep(3);
  };

  return (
    <>
      {/* NAVBAR — same as home */}
      <div className="navbar-wrapper">
        <nav className="nav-left">
          <a href="/Home">Home</a>
          <a href="/create-workflow">Product</a>
          <a href="/Dashboard">Dashboard</a>
          <a href="/https://github.com/deepanshu-QM/Quant-n8n">GitHub</a>
          <a href="/Login">Login</a>
        </nav>
        <nav className="nav-right">
          <a href="/signup">Signup</a>
          <a href="/contact" className="btn-contact">Contact Us</a>
        </nav>
      </div>

      {/* SIGNUP PAGE */}
      <div className="signup-page">

        {/* LEFT PANEL */}
        <div className="signup-left">
          <div className="signup-left-inner">
            <h1 className="signup-brand">Quant A.I.</h1>
            <p className="signup-brand-sub">
              The next generation of finance is being built — and you're
              early.
            </p>

            <div className="signup-features">
              <div className="signup-feature-item">
                <span className="signup-feature-dot" />
                Real-time market data & signals
              </div>
              <div className="signup-feature-item">
                <span className="signup-feature-dot" />
                Visual workflow builder
              </div>
              <div className="signup-feature-item">
                <span className="signup-feature-dot" />
                Trade Solana, BNB & Hyperliquid
              </div>
              <div className="signup-feature-item">
                <span className="signup-feature-dot" />
                AI-powered portfolio insights
              </div>
              <div className="signup-feature-item">
                <span className="signup-feature-dot" />
                Social signal engine
              </div>
            </div>

            {/* Step indicator */}
            <div className="signup-steps">
              <div className={`signup-step ${step >= 1 ? "active" : ""}`}>
                <div className="step-circle">1</div>
                <span>Your Info</span>
              </div>
              <div className="step-line" />
              <div className={`signup-step ${step >= 2 ? "active" : ""}`}>
                <div className="step-circle">2</div>
                <span>Security</span>
              </div>
              <div className="step-line" />
              <div className={`signup-step ${step >= 3 ? "active" : ""}`}>
                <div className="step-circle">3</div>
                <span>Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="signup-right">

          {/* STEP 1 */}
          {step === 1 && (
            <form className="signup-form" onSubmit={handleNext}>
              <span className="signup-tag">Step 1 of 2</span>
              <h2 className="signup-form-title">Create your account</h2>
              <p className="signup-form-sub">
                Already have one?{" "}
                <a href="/login" className="signup-link">Sign in</a>
              </p>

              <div className="signup-form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="@johndoe"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="signup-form-group">
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

              <div className="signup-form-group">
                <label htmlFor="phone">Phone Number <span className="optional">(optional)</span></label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="signup-error">{error}</p>}

              <button type="submit" className="signup-btn">
                Continue →
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form className="signup-form" onSubmit={handleSubmit}>
              <span className="signup-tag">Step 2 of 2</span>
              <h2 className="signup-form-title">Secure your account</h2>
              <p className="signup-form-sub">Choose a strong password.</p>

              <div className="signup-form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="signup-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password strength bar */}
              <div className="password-strength">
                <div
                  className="strength-bar"
                  style={{
                    width:
                      form.password.length === 0
                        ? "0%"
                        : form.password.length < 6
                        ? "33%"
                        : form.password.length < 10
                        ? "66%"
                        : "100%",
                    background:
                      form.password.length === 0
                        ? "#eee"
                        : form.password.length < 6
                        ? "#ff4444"
                        : form.password.length < 10
                        ? "#ffaa00"
                        : "#00cc55",
                  }}
                />
              </div>
              <p className="strength-label">
                {form.password.length === 0
                  ? ""
                  : form.password.length < 6
                  ? "Weak"
                  : form.password.length < 10
                  ? "Medium"
                  : "Strong ✓"}
              </p>

              {error && <p className="signup-error">{error}</p>}

              <div className="signup-btn-row">
                <button
                  type="button"
                  className="signup-btn-back"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button type="submit" className="signup-btn">
                  Create Account →
                </button>
              </div>
            </form>
          )}

          {/* STEP 3 — SUCCESS */}
          {step === 3 && (
            <div className="signup-success">
              <div className="signup-success-icon">✓</div>
              <h2>You're in!</h2>
              <p>Your Quant A.I. account has been created successfully.</p>
              <button
                className="signup-btn"
                onClick={() => navigate("/")}
              >
                Go to Dashboard →
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Signup;