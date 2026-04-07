import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type NodeTypes,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { Timer } from '@/nodes/triggers/Timer';

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter";

export type NodeMetadata = any;

type WorkflowNode = Node<
  {
    kind: "actions" | "triggers";
    metadata: NodeMetadata;
  },
  NodeKind
>;

type WorkflowEdge = Edge;

const nodeTypes: NodeTypes = {
  "price-trigger": PriceTrigger,
  timer: Timer,
};

export function CreateWorkFlow() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [edges, setEdges] = useState<WorkflowEdge[]>([]);

  const onNodesChange: OnNodesChange<WorkflowNode> = useCallback((changes) => {
    setNodes((nodesSnapShot) => applyNodeChanges<WorkflowNode>(changes, nodesSnapShot));
  }, []);

  const onEdgesChange: OnEdgesChange<WorkflowEdge> = useCallback((changes) => {
    setEdges((edgesSnapShot) => applyEdgeChanges<WorkflowEdge>(changes, edgesSnapShot));
  }, []);

  const onConnect: OnConnect = useCallback((params) => {
    setEdges((edgesSnapShot) => addEdge(params, edgesSnapShot));
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={(kind, metadata) => {
            setNodes([...nodes, {
              id: Math.random().toString(),
              type: kind,
              data: {
                kind: "triggers",
                metadata,
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