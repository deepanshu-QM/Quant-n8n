
/*import { SUPPORTED_ASSETS } from "common/types";   older Code */
/*
import { Handle, Position } from "@xyflow/react";
import { type TradingMetadata } from "common/types";
*/
/*
export type TradingMetadata = {
    type : "LONG" | "SHORT",
    qty : number,
    symbol : typeof SUPPORTED_ASSETS[number]
}   before Common type Code base */

/*
export function Lighter({data} : {
    data : {
        metadata : TradingMetadata
    }
}) {
    return <div className="p-4 border">
        Lighter Trade
        <div>Type : {data.metadata.type}</div>
        <div>Qty : {data.metadata.qty}</div>
        <div>Symbol : {data.metadata.symbol}</div>
        <Handle type="source" position={Position.Right}></Handle>
        <Handle type="target" position={Position.Left}></Handle>
    </div>
} */


    import { Handle, Position } from "@xyflow/react";
import { type TradingMetadata } from "common/types";
import { TrendingUp, TrendingDown, Coins, Hash } from "lucide-react"; // ✦ NEW

// it is a Lighter Node
export function Lighter({ data }: {
    data: {
        metadata: TradingMetadata
    }
}) {
    const isLong = data.metadata.type === "LONG"; // ✦ NEW

    return (
        // ✦ CHANGED: was plain <div className="p-4 border">
        <div className="relative flex flex-col gap-2 px-3 py-2 min-w-[160px]">

            {/* ✦ NEW — Header row with exchange name + direction badge */}
            <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold tracking-wide text-foreground">
                    Lighter
                </span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isLong
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400"
                }`}>
                    {isLong
                        ? <TrendingUp size={10} className="inline mr-0.5" />
                        : <TrendingDown size={10} className="inline mr-0.5" />
                    }
                    {data.metadata.type}
                </span>
            </div>

            {/* ✦ NEW — divider */}
            <div className="h-px bg-border w-full" />

            {/* ✦ CHANGED: was plain <div>Symbol : ...</div> */}
            <div className="flex flex-col gap-1 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Coins size={11} />
                    <span className="font-medium text-foreground">{data.metadata.symbol}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Hash size={11} />
                    <span>Qty: <span className="font-medium text-foreground">{data.metadata.qty}</span></span>
                </div>
            </div>

            {/* ✦ UNCHANGED — handles */}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}