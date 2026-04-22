import React, { useState } from "react";
import "./documentation.css";

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("intro");

  return (
    <>
      {/* NAVBAR — same as home/signup */}
      <div className="navbar-wrapper">
        <nav className="nav-left">
          <a href="/Home">Home</a>
          <a href="/create-workflow">Product</a>
          <a href="/documentation" className="active">Documentation</a>
          <a href="/https://github.com/deepanshu-QM/Quant-n8n">GitHub</a>
        </nav>
        <nav className="nav-right">
          <a href="/signup">Signup</a>
          <a href="/contact" className="btn-contact">Contact Us</a>
        </nav>
      </div>

      {/* DOCUMENTATION PAGE */}
      <div className="doc-page">
        
        {/* LEFT PANEL: SIDEBAR */}
        <aside className="doc-sidebar">
          <div className="doc-sidebar-inner">
            <h2 className="doc-brand">Quant A.I. Docs</h2>
            <p className="doc-brand-sub">Build the future of finance.</p>

            <div className="doc-nav-group">
              <span className="doc-nav-heading">Getting Started</span>
              <button 
                className={`doc-nav-link ${activeSection === "intro" ? "active" : ""}`}
                onClick={() => setActiveSection("intro")}
              >
                <span className="doc-nav-dot" /> Introduction
              </button>
              <button 
                className={`doc-nav-link ${activeSection === "quickstart" ? "active" : ""}`}
                onClick={() => setActiveSection("quickstart")}
              >
                <span className="doc-nav-dot" /> Quick Start
              </button>
            </div>

            <div className="doc-nav-group">
              <span className="doc-nav-heading">API Reference</span>
              <button 
                className={`doc-nav-link ${activeSection === "authentication" ? "active" : ""}`}
                onClick={() => setActiveSection("authentication")}
              >
                <span className="doc-nav-dot" /> Authentication
              </button>
              <button 
                className={`doc-nav-link ${activeSection === "endpoints" ? "active" : ""}`}
                onClick={() => setActiveSection("endpoints")}
              >
                <span className="doc-nav-dot" /> Endpoints
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL: MAIN CONTENT */}
        <main className="doc-main">
          <div className="doc-content-inner">
            
            {activeSection === "intro" && (
              <div className="doc-section fade-in">
                <span className="doc-tag">Overview</span>
                <h1 className="doc-title">Introduction to Quant A.I.</h1>
                <p className="doc-text">
                  Welcome to the official documentation for Quant A.I. Our platform empowers developers and traders to build, backtest, and deploy algorithmic trading strategies using visual workflows and real-time social signals.
                </p>
                
                <h2 className="doc-subtitle">Key Capabilities</h2>
                <ul className="doc-list">
                  <li><strong>Real-time market data:</strong> Millisecond latency connections to Solana, BNB, and Hyperliquid.</li>
                  <li><strong>Social sentiment engine:</strong> Tap into Twitter, Discord, and Telegram signal parsing.</li>
                  <li><strong>Visual workflow builder:</strong> Drag and drop logical operators without writing complex boilerplate.</li>
                </ul>

                <div className="doc-callout">
                  <strong>Note:</strong> You must have a registered account to access API keys. <a href="/signup" className="doc-link">Sign up here</a>.
                </div>
              </div>
            )}

            {activeSection === "quickstart" && (
              <div className="doc-section fade-in">
                <span className="doc-tag">Guide</span>
                <h1 className="doc-title">Quick Start</h1>
                <p className="doc-text">
                  Get up and running with the Quant A.I. SDK in less than five minutes.
                </p>

                <h2 className="doc-subtitle">1. Installation</h2>
                <p className="doc-text">Install the core package via npm or yarn.</p>
                <div className="doc-code-block">
                  <code>npm install @quant-ai/sdk</code>
                </div>

                <h2 className="doc-subtitle">2. Initialization</h2>
                <p className="doc-text">Import the SDK and initialize it using your private API key.</p>
                <div className="doc-code-block">
                  <pre>
{`import { QuantClient } from '@quant-ai/sdk';

const client = new QuantClient({
  apiKey: 'YOUR_API_KEY_HERE',
  environment: 'production'
});

await client.connect();
console.log("Connected to Quant A.I. network");`}
                  </pre>
                </div>
              </div>
            )}

            {activeSection === "authentication" && (
              <div className="doc-section fade-in">
                <span className="doc-tag">Security</span>
                <h1 className="doc-title">Authentication</h1>
                <p className="doc-text">
                  All requests to the Quant A.I. API must be authenticated using a Bearer token.
                </p>

                <h2 className="doc-subtitle">Headers</h2>
                <div className="doc-code-block">
                  <pre>
{`Authorization: Bearer <YOUR_API_KEY>
Content-Type: application/json`}
                  </pre>
                </div>
                <p className="doc-text">
                  You can generate and revoke API keys directly from your <a href="/dashboard" className="doc-link">Dashboard Settings</a>.
                </p>
              </div>
            )}

            {activeSection === "endpoints" && (
              <div className="doc-section fade-in">
                <span className="doc-tag">Reference</span>
                <h1 className="doc-title">Core Endpoints</h1>
                <p className="doc-text">
                  Interact with live market data and trigger your workflows programmatically.
                </p>

                <div className="doc-endpoint-card">
                  <div className="doc-endpoint-header">
                    <span className="method-get">GET</span>
                    <span className="endpoint-url">/v1/market/signals</span>
                  </div>
                  <p className="doc-text">Retrieves the latest social sentiment scores for a specific ticker.</p>
                </div>

                <div className="doc-endpoint-card">
                  <div className="doc-endpoint-header">
                    <span className="method-post">POST</span>
                    <span className="endpoint-url">/v1/workflow/trigger</span>
                  </div>
                  <p className="doc-text">Manually fires a saved visual workflow by its unique ID.</p>
                </div>
              </div>
            )}

            {/* Pagination / Next steps mimicking signup button */}
            <div className="doc-footer-nav">
              <button className="doc-btn-primary">
                Was this helpful? Yes →
              </button>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default Documentation;