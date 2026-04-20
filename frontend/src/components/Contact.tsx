import React, { useState } from "react";
import "./contact.css";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* NAVBAR — same as home */}
      <div className="navbar-wrapper">
        <nav className="nav-left">
          <a href="/">Home</a>
          <a href="/create-workflow">Product</a>
          <a href="#">Documentation</a>
          <a href="/https://github.com/deepanshu-QM/Quant-n8n">GitHub</a>
        </nav>
        <nav className="nav-right">
          <a href="/signup">Signup</a>
          <a href="/contact" className="btn-contact">Contact Us</a>
        </nav>
      </div>

      {/* CONTACT PAGE */}
      <div className="contact-page">

        {/* LEFT PANEL */}
        <div className="contact-left">
          <div className="contact-left-inner">
            <span className="contact-tag">Get in touch</span>
            <h1 className="contact-heading">
              Let's build the<br />
              future of finance<br />
              <em>together.</em>
            </h1>
            <p className="contact-subtext">
              Have a question, partnership idea, or just want to say hello?
              We'd love to hear from you.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">✉</div>
                <div>
                  <p className="contact-info-label">Email</p>
                  <p className="contact-info-value">hello@quantai.io</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <p className="contact-info-label">Location</p>
                  <p className="contact-info-value">San Francisco, CA</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">🕐</div>
                <div>
                  <p className="contact-info-label">Response Time</p>
                  <p className="contact-info-value">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — FORM */}
        <div className="contact-right">
          {submitted ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>
              <h2>Message Sent!</h2>
              <p>We'll get back to you within 24 hours.</p>
              <button
                className="contact-submit-btn"
                onClick={() => setSubmitted(false)}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Send us a message</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
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
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="support">Support</option>
                    <option value="press">Press & Media</option>
                    <option value="careers">Careers</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;