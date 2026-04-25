import React from "react";
import "./home.css";

// — Images
import chartImg from "../assets/ChartQunat.jpg";
import bitcoinImg from "../assets/bitcoin-Qunat.jpg";
import moneyImg from "../assets/moneyQuant-2.jpg";
import solanaIcon from "../assets/solana.png";
import binanceIcon from "../assets/binance.png";
import hyperliquidIcon from "../assets/hyperliquid.png";
import grid5img1 from "../assets/grid5img1.jpg";
import grid5img2 from "../assets/grid5img2.jpg";
import grid5img3 from "../assets/grid5img3.jpg";
import grid5img4 from "../assets/grid5img4.jpg";
import grid5img5 from "../assets/grid5img5.jpg";

// — Videos
import bgVideo from "../assets/HDforQuant03.mp4";
import keyVideo from "../assets/key-video.mp4";
import securityVideo from "../assets/security.mp4";

const Home: React.FC = () => {
  return (
    <>
      {/* NAVBAR */}
      <div className="navbar-wrapper">
        <nav className="nav-left">
          <a href="/Home">Home</a>
          <a href="/create-workflow">Product</a>
          <a href="/Dashboard">Dashboard</a>
          <a href="https://github.com/deepanshu-QM/Quant-n8n">GitHub</a>
          <a href="/Login">Login</a>
        </nav>

        <nav className="nav-right">
          <a href="/Signup">Signup</a>
          <a href="/Contact" className="btn-contact">
            Contact Us
          </a>
        </nav>
      </div>

      {/* PAGE 1 */}
      <section className="page one">
        <div className="midbox">
          <h1>Shaping the Future</h1>
          <h1>
            Of Finance, <em>Together.</em>
          </h1>
          <p>Join Our Team &amp; Community to Build the next Gen Product</p>
        </div>
      </section>

      {/* PAGE 2 */}
      <section className="page two">
        <div className="video-container">
          <video autoPlay muted loop playsInline className="bg-video">
            <source src={bgVideo} type="video/mp4" />
          </video>

          <div className="content">
            <h1>
              Connect, <em>Invest</em>, Share
            </h1>
            <p>Real-time data. Institutional grade tools. Built for everyone.</p>
          </div>
        </div>
      </section>

      {/* EXTRAS */}
      <div className="extras">
        {/* Grid 1 */}
        <div className="gridcontainer1">
          <div>
            <img src={chartImg} alt="chart"  />
          </div>
          <div>
            <h3>Fusing Finance with</h3>
            <h3>Social Connectivity</h3>
            <p>
              Help us build a vibrant ecosystem where ideas spark financial
              innovation.
            </p>
          </div>
        </div>

        {/* Grid 2 */}
        <div className="gridcontainer2">
          <div>
            <h3>Empowering</h3>
            <h3>Investors</h3>
            <h3>Your Voice, Our Future</h3>
            <p>Every member is essential to our evolution.</p>
          </div>
          <div>
            <img src={bitcoinImg} alt="bitcoin" />
          </div>
        </div>

        {/* Grid 3 */}
        <div className="gridcontainer3">
          <div>
            <img src={moneyImg}  alt="money" />
          </div>
          <div>
            <h3>Beyond Investing</h3>
            <h3>Shaping Tomorrow</h3>
            <p>
              The industry is flooded with platforms — QuantAI is a leap
              forward.
            </p>
          </div>
        </div>

        {/* Grid 4 */}
        <div className="gridcontainer4">
          <div>
            <img src={solanaIcon} className="icon" alt="Solana" />
            <h2>Trade with Solana (SOL)</h2>
            <p>Execute high-speed trades on Solana.</p>
          </div>
          <div>
            <img src={binanceIcon} className="icon" alt="Binance" />
            <h2>Trade with Binance Coin (BNB)</h2>
            <p>Automate BNB trading strategies.</p>
          </div>
          <div>
            <img src={hyperliquidIcon} className="icon" alt="Hyperliquid" />
            <h2>Trade via Hyperliquid API</h2>
            <p>Automate perpetual futures trading.</p>
          </div>
        </div>
      </div>

      {/* PAGE 3 */}
      <section className="page three">
        <div className="containerOfSection3">
          <h1>Quant A.I.</h1>
          <p>
            <i>Visual Workflow Builder &amp; Real-time Trading Dashboard</i>
          </p>

          <div className="grid5">
            <div>
              <img src={grid5img1} className="grid5img" alt="dashboard 1" loading="lazy" decoding="async"/>
            </div>
            <div>
              <img src={grid5img2} className="grid5img" alt="dashboard 2" loading="lazy" decoding="async" />
            </div>
            <div>
              <img src={grid5img3} className="grid5img" alt="dashboard 3" loading="lazy" decoding="async" />
            </div>
            <div>
              <img src={grid5img4} className="grid5img" alt="dashboard 4" loading="lazy" decoding="async" />
            </div>
            <div>
              <img src={grid5img5} className="grid5img" alt="dashboard 5" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="grid5-3">
            <div>
              <h1>Insights at your fingertips</h1>
              <p>Real-time market intelligence across assets.</p>
            </div>
            <div>
              <h1>Social signal engine</h1>
              <p>Turn community into quant signals.</p>
            </div>
            <div>
              <h1>Tailored to you</h1>
              <p>Personalized insights coming soon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 4 */}
      <section className="page four">
        <div>
          <h1>One of the best platforms I've ever used</h1>
          <h1>— super easy and useful!</h1>
        </div>
      </section>

      {/* PAGE 5 */}
      <section className="page five">
        <div className="grid6">
          <div className="video-container6">
            <video autoPlay muted loop playsInline className="bg-video">
              <source src={keyVideo} type="video/mp4" />
            </video>
            <div className="content6">
              <h1>Committed to Compliance</h1>
              <p>User safety and innovation go hand in hand</p>
            </div>
          </div>

          <div className="video-container6">
            <video autoPlay muted loop playsInline className="bg-video">
              <source src={securityVideo} type="video/mp4" />
            </video>
            <div className="content6">
              <h1>Beyond Security</h1>
              <p>We safeguard your investment</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 6 */}
      <section className="page six">
        <div className="page6-button-wrapper">
          <button className="users-btn">users</button>
        </div>

        <div className="page6-heading">
          <h1>We believe that knowledge</h1>
          <h1>empowers investing.</h1>
        </div>

        <div className="grid6-1">
          <div className="box">Alpha insights</div>
          <div className="box">Real-time data</div>
          <div className="box">Smart signals</div>
        </div>

        <div className="grid6-2">
          <div className="box">AI analytics</div>
          <div className="box">Market sentiment</div>
          <div className="box">Portfolio tracking</div>
        </div>

        <div className="grid6-3">
          <div className="box large">
            <h2>Deep Research Engine</h2>
            <p>
              Understand markets with AI-powered insights and structured
              analysis.
            </p>
          </div>
          <div className="box small">
            <h2>Signals</h2>
            <p>Fast alerts</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;