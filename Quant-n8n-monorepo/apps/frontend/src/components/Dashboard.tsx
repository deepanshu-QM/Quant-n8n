import React, { useEffect, useRef, useState, useCallback } from "react";
import "./dashboard.css";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
} from "chart.js";
import type { ChartConfiguration } from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
);

// ─── Types ───────────────────────────────────────────────

interface CoinMeta {
  name: string;
  icon: string;
}

interface CoinData {
  symbol: string;
  price: number;
  change: number;
  high: number;
  low: number;
  volume: number;
}

interface PriceMap {
  [symbol: string]: CoinData;
}

interface Timeframe {
  label: string;
  value: string;
  limit: number;
}

interface TokenCardProps {
  coin: CoinData;
  meta: CoinMeta;
  prevPrice?: number;
  onClick: (symbol: string) => void;
}

interface ChartModalProps {
  symbol: string;
  coin: CoinData;
  meta: CoinMeta;
  onClose: () => void;
}

// ─── Constants ───────────────────────────────────────────

const COIN_META: Record<string, CoinMeta> = {
  BTCUSDT:   { name: "Bitcoin",           icon: "₿" },
  ETHUSDT:   { name: "Ethereum",          icon: "Ξ" },
  SOLUSDT:   { name: "Solana",            icon: "◎" },
  BNBUSDT:   { name: "BNB",               icon: "B" },
  XRPUSDT:   { name: "XRP",               icon: "✕" },
  ADAUSDT:   { name: "Cardano",           icon: "A" },
  DOGEUSDT:  { name: "Dogecoin",          icon: "Ð" },
  AVAXUSDT:  { name: "Avalanche",         icon: "A" },
  LINKUSDT:  { name: "Chainlink",         icon: "⬡" },
  DOTUSDT:   { name: "Polkadot",          icon: "●" },
  TRXUSDT:   { name: "TRON",              icon: "T" },
  NEARUSDT:  { name: "NEAR Protocol",     icon: "N" },
  TONUSDT:   { name: "Toncoin",           icon: "T" },
  SHIBUSDT:  { name: "Shiba Inu",         icon: "S" },
  MATICUSDT: { name: "Polygon",           icon: "⬣" },
  APTUSDT:   { name: "Aptos",             icon: "A" },
  ICPUSDT:   { name: "Internet Computer", icon: "∞" },
  IMXUSDT:   { name: "Immutable",         icon: "I" },
};

const TIMEFRAMES: Timeframe[] = [
  { label: "1m",  value: "1m",  limit: 120 },
  { label: "5m",  value: "5m",  limit: 96  },
  { label: "15m", value: "15m", limit: 96  },
  { label: "1h",  value: "1h",  limit: 96  },
  { label: "4h",  value: "4h",  limit: 60  },
  { label: "1D",  value: "1d",  limit: 60  },
];

// ─── Formatters ──────────────────────────────────────────

function fmt(n: number | string | undefined, _d: number = 2): string {
  const val = parseFloat(String(n ?? 0));
  if (val >= 1000) return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (val >= 1)    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 });
}

function fmtShort(n: number | string | undefined): string {
  const val = parseFloat(String(n ?? 0));
  if (val > 1e9) return (val / 1e9).toFixed(2) + "B";
  if (val > 1e6) return (val / 1e6).toFixed(2) + "M";
  if (val > 1e3) return (val / 1e3).toFixed(2) + "K";
  return val.toFixed(2);
}

// ─── Navbar Component ────────────────────────────────────

const Navbar: React.FC = () => (
  <div className="navbar-wrapper">
    <nav className="nav-left">
      <a href="#">Home</a>
      <a href="/create-workflow">Product</a>
      <a href="/Dashboard">Dashboard</a>
      <a href="https://github.com/deepanshu-QM/Quant-n8n">GitHub</a>
      <a href="/Login">Login</a>
    </nav>
    <nav className="nav-right">
      <a href="/Signup">Signup</a>
      <a href="/Contact" className="btn-contact">Contact Us</a>
    </nav>
  </div>
);

// ─── Token Card ──────────────────────────────────────────

const TokenCard = React.memo<TokenCardProps>(({ coin, meta, prevPrice, onClick }) => {
  const isUp = parseFloat(String(coin.change ?? 0)) >= 0;
  const didChange = prevPrice !== undefined && prevPrice !== coin.price;
  const flashClass = didChange ? (coin.price > prevPrice ? "flash-up" : "flash-down") : "";

  return (
    <div className={`ticker-card ${flashClass}`} onClick={() => onClick(coin.symbol)}>
      <div className="ticker-card-top">
        <div className="ticker-card-left">
          <span className="ticker-icon">{meta.icon}</span>
          <div>
            <div className="ticker-coin-name">{meta.name}</div>
            <div className="ticker-coin-symbol">{coin.symbol}</div>
          </div>
        </div>
        <div className="ticker-card-right">
          <div className="ticker-price">${fmt(coin.price)}</div>
          <div className={`ticker-change ${isUp ? "up" : "down"}`}>
            {isUp ? "▲" : "▼"} {Math.abs(parseFloat(String(coin.change ?? 0))).toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="ticker-stats">
        <span>H: ${fmt(coin.high)}</span>
        <span>L: ${fmt(coin.low)}</span>
      </div>
    </div>
  );
});

TokenCard.displayName = "TokenCard";

// ─── Chart Modal ─────────────────────────────────────────

function ChartModal({ symbol, coin, meta, onClose }: ChartModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);
  const [tf, setTf]           = useState<string>("1m");
  const [loading, setLoading] = useState<boolean>(false);

  const loadChart = useCallback(async (sym: string, interval: string, limit: number): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${sym}&interval=${interval}&limit=${limit}` /* Since Binace api is Public No need of .env file*/
      );
      const klines: unknown[][] = await res.json();
      if (!Array.isArray(klines) || !klines.length) return;

      const labels: string[] = klines.map((k) => {
        const d = new Date(k[0] as number);
        return interval === "1d"
          ? d.toLocaleDateString("en", { month: "short", day: "numeric" })
          : d.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" });
      });
      const data: number[] = klines.map((k) => parseFloat(k[4] as string));
      const isRising = data[data.length - 1] >= data[0];
      const lineColor = isRising ? "#0ca678" : "#f03e3e";
      const fillColor = isRising ? "rgba(12,166,120,0.08)" : "rgba(240,62,62,0.08)";

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const config: ChartConfiguration<"line"> = {
        type: "line",
        data: {
          labels,
          datasets: [{
            data,
            borderColor:     lineColor,
            backgroundColor: fillColor,
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            tension: 0.3,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 300 },
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: "index",
              intersect: false,
              callbacks: {
                label: (v) =>
                  "$" + parseFloat(String(v.parsed.y)).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  }),
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { maxTicksLimit: 8, font: { size: 10 }, color: "#999", maxRotation: 0 },
            },
            y: {
              position: "right",
              grid: { color: "rgba(0,0,0,0.04)" },
              ticks: {
                font: { size: 10 },
                color: "#999",
                callback: (v) => "$" + Number(v).toLocaleString(),
              },
            },
          },
        },
      };

      chartRef.current = new Chart(ctx, config);
    } catch (e) {
      console.error("Chart error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const tf_obj = TIMEFRAMES.find((t) => t.value === tf) ?? TIMEFRAMES[0];
    loadChart(symbol, tf_obj.value, tf_obj.limit);
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [symbol, tf, loadChart]);

  const isUp = parseFloat(String(coin?.change ?? 0)) >= 0;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-head">
          <div className="modal-icon">{meta?.icon}</div>
          <div>
            <div className="modal-coin-name">{meta?.name}</div>
            <div className="modal-coin-sym">{symbol}</div>
          </div>
          <div className="modal-price-block">
            <div className="modal-price">${fmt(coin?.price)}</div>
            <div className={`ticker-change ${isUp ? "up" : "down"}`} style={{ marginLeft: "auto" }}>
              {isUp ? "▲" : "▼"} {Math.abs(parseFloat(String(coin?.change ?? 0))).toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="modal-stats">
          <div className="stat-box">
            <div className="stat-label">24h High</div>
            <div className="stat-val">${fmt(coin?.high)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">24h Low</div>
            <div className="stat-val">${fmt(coin?.low)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">24h Volume</div>
            <div className="stat-val">{fmtShort(coin?.volume)}</div>
          </div>
        </div>

        <div className="tf-btns">
          {TIMEFRAMES.map((t) => (
            <button
              key={t.value}
              className={`tf-btn${tf === t.value ? " active" : ""}`}
              onClick={() => setTf(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="chart-wrap">
          {loading && <div className="chart-loading">Loading chart...</div>}
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Component ────────────────────────────

const Dashboard: React.FC = () => {
  const [prices,     setPrices]     = useState<PriceMap>({});
  const [prevPrices, setPrevPrices] = useState<PriceMap>({});
  const [status,     setStatus]     = useState<string>("Connecting...");
  const [modal,      setModal]      = useState<string | null>(null);

  useEffect(() => {
    const streams = Object.keys(COIN_META)
      .map((s) => s.toLowerCase() + "@ticker")
      .join("/");

    let ws: WebSocket;
    let retryTimer: ReturnType<typeof setTimeout>;

    const connect = (): void => {
      ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

      ws.onopen  = () => setStatus("Connected");
      ws.onclose = () => {
        setStatus("Reconnecting...");
        retryTimer = setTimeout(connect, 3000);
      };
      ws.onerror = () => ws.close();

      ws.onmessage = (e: MessageEvent) => {
        const msg = JSON.parse(e.data as string);
        const d   = msg.data ?? msg;
        const sym: string = d.s;
        if (!COIN_META[sym]) return;

        setPrices((cur) => {
          setPrevPrices(cur);
          return {
            ...cur,
            [sym]: {
              symbol: sym,
              price:  parseFloat(d.c),
              change: parseFloat(d.P),
              high:   parseFloat(d.h),
              low:    parseFloat(d.l),
              volume: parseFloat(d.v),
            },
          };
        });
      };
    };

    connect();
    return () => {
      clearTimeout(retryTimer);
      ws?.close();
    };
  }, []);

  const handleCardClick  = useCallback((sym: string) => setModal(sym), []);
  const handleModalClose = useCallback(() => setModal(null), []);

  const coins = Object.values(prices);

  return (
    <>
      <Navbar />
      <div className="ticker-page">
        <div className="ticker-header-flex">
          <span className={`ticker-tag ${status === "Connected" ? "live" : "offline"}`}>
            ● {status === "Connected" ? "Live Feed" : status}
          </span>
          <h2 className="ticker-title">Market Overview</h2>
        </div>

        {coins.length === 0 ? (
          <p className="ticker-loading">Initialising data streams...</p>
        ) : (
          <div className="ticker-grid">
            {coins.map((coin) => {
              const meta      = COIN_META[coin.symbol] ?? { name: coin.symbol, icon: "?" };
              const prevPrice = prevPrices[coin.symbol]?.price;
              return (
                <TokenCard
                  key={coin.symbol}
                  coin={coin}
                  meta={meta}
                  prevPrice={prevPrice}
                  onClick={handleCardClick}
                />
              );
            })}
          </div>
        )}

        {modal !== null && prices[modal] !== undefined && (
          <ChartModal
            symbol={modal}
            coin={prices[modal]}
            meta={COIN_META[modal] ?? { name: modal, icon: "?" }}
            onClose={handleModalClose}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;