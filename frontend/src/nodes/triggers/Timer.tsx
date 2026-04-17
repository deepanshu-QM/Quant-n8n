
import {Handle, Position} from "@xyflow/react"



export type TimerNodeMetadata = {
    time : number,
};

export function Timer({data, isConnectable} : {
    data : {
        metadata : TimerNodeMetadata
    },
    isConnectable : boolean
}) {
    return (
    <div className="p-4 border">
          {data.metadata.time / 3600}  seconds
        <Handle type="source" position={Position.Right} isConnectable={isConnectable}></Handle>
    </div>);
}