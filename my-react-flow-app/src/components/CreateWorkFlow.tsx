import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import type { Node, Edge, NodeChange, EdgeChange, Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
import { Timer } from '@/nodes/Timer';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';

export type NodeKind = "price-trigger" | "timer-trigger" | "hyperliquid" | "backpack" | "lighter";

interface NodeData extends Record<string, unknown> {
  type: "action" | "trigger";
  kind: NodeKind;
  metadata: any;
  label: string;
}

type WorkflowNode = Node<NodeData>;

// Outside the component so nodeTypes reference is stable
const nodeTypes = {
  "timer-trigger": Timer,
  "price-trigger": PriceTrigger,
};

export function CreateWorkFlow() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edges) => applyEdgeChanges(changes, edges)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((edges) => addEdge(params, edges)),
    [],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={(kind, metadata) => {
            setNodes([...nodes, {
              id: Math.random().toString(),
              type: kind,           // tells ReactFlow which nodeTypes entry to use
              data: {
                type: "trigger",
                kind,
                metadata,
                label: kind,
              },
              position: { x: 0, y: 0 },
            }]);
          }}
        />
      )}
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}