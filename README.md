
# QuantTrade-n8n

No-code trading bots and agents — built on n8n, wired to real markets.

A visual, no-code platform for building and deploying autonomous trading bots and intelligent trading agents. Set price triggers, chain logic nodes, and execute real trades on Zerodha and Binance — all without writing a single line of code.

What is Quant-n8n?
quant-n8n extends n8n with a suite of custom trading nodes purpose-built for financial markets. You drag, drop, and connect nodes to define your entire trading strategy — from data ingestion to order execution.
Set a trigger like "when SOL drops below $150" or "run this workflow every 10 minutes", chain it through indicator nodes, risk filters, and decision logic — and let the platform place real trades on your behalf, fully automated, fully visual.


Features

Visual Workflow Builder — drag-and-drop interface powered by n8n
Price Triggers — fire workflows when an asset crosses a defined threshold
Time-based Polling — schedule workflows to repeat every N minutes
Real Trade Execution — place live orders on Zerodha and Binance
Live Market Data — fetch prices from Robinhood (US), Zerodha/NSE (India)
Custom n8n Nodes — purpose-built nodes for trading logic
Distributed Executor — queue-based execution engine for reliable workflow runs
MongoDB Workflow Store — store workflow definitions, logs, and market snapshots


WorkFlow :
[Interval Trigger: every 10 min]
        ↓
[Fetch Price: SOL from Binance]
        ↓
[Condition: price < 150]
        ↓ (true)
[Risk Filter: max 5% of portfolio]
        ↓
[Place Order: BUY 1 SOL on Binance]
        ↓
[Log Result → MongoDB]

