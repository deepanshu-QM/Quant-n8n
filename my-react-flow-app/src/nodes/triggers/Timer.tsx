
import {Handle, Position} from "@xyflow/react"



type TimerNodeMetadata = {
    time : string,
};

export function Timer({data, isConnectable} : {
    data : {
        metadata : TimerNodeMetadata
    },
    isConnectable : boolean
}) {
    return 
    <div>
        Every {data.metadata.time /3600} seconds 
        <Handle type="source" position={Position.Right}></Handle>
    </div>
}