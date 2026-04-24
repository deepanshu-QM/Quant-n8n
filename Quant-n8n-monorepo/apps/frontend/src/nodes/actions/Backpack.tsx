
/*import { SUPPORTED_ASSETS } from "@/components/TriggerSheet"; */
import { Handle, Position } from "@xyflow/react";
import { type TradingMetadata } from "common/types";

/*
export type TradingMetadata = {
    type : "LONG" | "SHORT",
    qty : number,
    symbol : typeof SUPPORTED_ASSETS[number]
} */


//it is an Backpack Node : 
export function Backpack({data} : {
    data : {
        metadata : TradingMetadata
    }
}) {  /* Bug Fixed Here */
    return <div className="p-4 border">
        Backpack Trade
        <div>Type : {data.metadata.type}</div>
        <div>Qty : {data.metadata.qty}</div>
        <div>Asset : {data.metadata.symbol}</div>
        <Handle type="source" position={Position.Right}></Handle>
        <Handle type="target" position={Position.Left}></Handle>
    </div>
}