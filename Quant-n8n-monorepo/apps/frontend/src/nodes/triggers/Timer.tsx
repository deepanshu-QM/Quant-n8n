
import { Handle, Position } from "@xyflow/react";
import type { TimerNodeMetadata as CommonTimerNodeMetadata } from "common/types";

export type { TimerNodeMetadata } from "common/types";

export function Timer({
  data,
  isConnectable,
}: {
  data: {
    metadata: CommonTimerNodeMetadata;
  };
  isConnectable: boolean;
}) {
  return ( /* Bug Fixed */
    <div className="p-4 border">
      {data.metadata.time} seconds  
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}