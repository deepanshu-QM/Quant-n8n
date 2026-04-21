import React, { useEffect, useState } from "react";
import "./CryptoTicker.css";

interface CoinData {
  symbol: string;
  price: string;
  change: string | number;
  high?: string;
  low?: string;
}

interface MetaData {
  name: string;
  icon: string;
}

const COIN_META: Record<string, MetaData> = {
  BTCUSDT:  { name: "Bitcoin", icon: "₿" },
  ETHUSDT:  { name: "Ethereum", icon: "Ξ" },
  USDTUSDT: { name: "Tether", icon: "₮" },
  BNBUSDT:  { name: "BNB", icon: "B" },
  XRPUSDT:  { name: "XRP", icon: "✕" },
  USDCUSDT: { name: "USD Coin", icon: "$" },
  ADAUSDT:  { name: "Cardano", icon: "A" },
  AVAXUSDT: { name: "Avalanche", icon: "A" },
  TONUSDT:  { name: "Toncoin", icon: "T" },
  LINKUSDT: { name: "Chainlink", icon: "🔗" },
  DOGEUSDT: { name: "Dogecoin", icon: "Ð" },
  DOTUSDT:  { name: "Polkadot", icon: "●" },
  MATICUSDT:{ name: "Polygon", icon: "⬣" },
  NEARUSDT: { name: "NEAR Protocol", icon: "N" },
  ICPUSDT:  { name: "Internet Computer", icon: "∞" },
  APTUSDT:  { name: "Aptos", icon: "A" },
  IMXUSDT:  { name: "Immutable", icon: "I" },
  TRXUSDT:  { name: "TRON", icon: "T" },
  SHIBUSDT: { name: "Shiba Inu", icon: "🐕" },
  SOLUSDT:  { name: "Solana", icon: "◎" }
};

const CryptoTicker: React.FC = () => {
  const [prices, setPrices] = useState<Record<string, CoinData>>({});
  const [prevPrices, setPrevPrices] = useState<Record<string, CoinData>>({});
  const [status, setStatus] = useState<string>("Connecting...");

  useEffect(() => {
    // Note: Ensure your local websocket server is running or replace with a public API
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => setStatus("Connected");
    ws.onclose = () => setStatus("Disconnected");
    ws.onerror = () => setStatus("Error");

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "PRICE_UPDATE") {
        setPrevPrices((prev) => ({
          ...prev,
          ...prices // Current becomes previous
        }));
        setPrices(msg.data);
      }
    };

    return () => ws.close();
  }, [prices]);

  const coins = Object.values(prices || {});

  return (
    <>
      {/* NAVBAR — Matching Login Reference */}
      <div className="navbar-wrapper">
        <nav className="nav-left">
          <a href="/Home">Home</a>
          <a href="/create-workflow">Product</a>
          <a href="/documentation">Documentation</a>
          <a href="https://github.com/deepanshu-QM/Quant-n8n">GitHub</a>
        </nav>
        <nav className="nav-right">
          <a href="/login">Login</a>
          <a href="/contact" className="btn-contact">Contact Us</a>
        </nav>
      </div>

      <div className="ticker-page">
        {/* LEFT PANEL — Branding & Info */}
        <div className="ticker-left">
          <div className="ticker-left-inner">
            <h1 className="ticker-brand">Live Market Data.</h1>
            <p className="ticker-brand-sub">
              Real-time updates from global exchanges. Monitor price action, 
              volatility, and trends with Quant A.I. high-frequency feeds.
            </p>

            <div className="ticker-features">
              <div className="ticker-feature-item">
                <span className="ticker-feature-dot" />
                WebSocket Low-Latency Feed
              </div>
              <div className="ticker-feature-item">
                <span className="ticker-feature-dot" />
                Institutional Grade Accuracy
              </div>
              <div className="ticker-feature-item">
                <span className="ticker-feature-dot" />
                24/7 Market Monitoring
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Ticker Grid */}
        <div className="ticker-right">
          <div className="ticker-container">
            <div className="ticker-header-flex">
               <span className="ticker-tag">
                 {status === "Connected" ? "● Live Feed" : `● ${status}`}
               </span>
               <h2 className="ticker-title">Market Overview</h2>
            </div>

            {coins.length === 0 ? (
              <p className="ticker-loading">Initialising data streams...</p>
            ) : (
              <div className="ticker-grid">
                {coins.map((coin) => {
                  const meta = COIN_META[coin.symbol] || { name: coin.symbol, icon: "?" };
                  const isUp = parseFloat(String(coin.change || 0)) >= 0;
                  const prevPrice = prevPrices[coin.symbol]?.price;

                  const flashClass =
                    prevPrice && prevPrice !== coin.price
                      ? coin.price > prevPrice
                        ? "flash-up"
                        : "flash-down"
                      : "";

                  return (
                    <div key={coin.symbol} className={`ticker-card ${flashClass}`}>
                      <div className="ticker-card-top">
                        <span className="ticker-icon">{meta.icon}</span>
                        <div>
                          <div className="ticker-coin-name">{meta.name}</div>
                          <div className="ticker-coin-symbol">{coin.symbol}</div>
                        </div>
                      </div>

                      <div className="ticker-price">
                        ${parseFloat(coin.price || "0").toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>

                      <div className={`ticker-change ${isUp ? "up" : "down"}`}>
                        {isUp ? "▲" : "▼"} {Math.abs(Number(coin.change || 0)).toFixed(2)}%
                      </div>

                      <div className="ticker-stats">
                        <span>H: ${coin.high || "-"}</span>
                        <span>L: ${coin.low || "-"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoTicker;