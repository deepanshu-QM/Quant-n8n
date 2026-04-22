

export const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH", "USDT","BNB", "XRP", "USDC", "ADA", "AVAX","TON", "LINK", "DOGE", "DOT", "MATIC", "NEAR","ICP","APT", "IMX","TRX", "SHIB"] as const;


export type TradingMetadata = {
    type : "LONG" | "SHORT",
    qty : number,
    symbol : typeof SUPPORTED_ASSETS[number]
}


export type TimerNodeMetadata = {
    time : number,
};


export type PriceTriggerMetadata = {
    asset: string,
    price: number
    decimals : number
};