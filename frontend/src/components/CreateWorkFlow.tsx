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
import { ActionSheet } from './ActionSheet';
import { PriceTrigger, type PriceTriggerMetadata } from '@/nodes/triggers/PriceTrigger';
import { Timer, type TimerNodeMetadata } from '@/nodes/triggers/Timer';
import type { TradingMetadata } from '@/nodes/actions/Lighter';

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter";

export type NodeMetadata = TradingMetadata | PriceTriggerMetadata | TimerNodeMetadata;

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
  const [selectedAction, setSelectedAction] = useState<{
    position: {
      x: number;
      y: number;
    };
    startingNodeId: string;
  } | null>(null);

  const onNodesChange: OnNodesChange<WorkflowNode> = useCallback((changes) => {
    setNodes((nodesSnapshot) => applyNodeChanges<WorkflowNode>(changes, nodesSnapshot));
  }, []);

  const onEdgesChange: OnEdgesChange<WorkflowEdge> = useCallback((changes) => {
    setEdges((edgesSnapshot) => applyEdgeChanges<WorkflowEdge>(changes, edgesSnapshot));
  }, []);

  const onConnect: OnConnect = useCallback((params) => {
    setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
  }, []);

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent, connectionInfo: any) => {
      if (!connectionInfo.isValid) {
        const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
        const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

        setSelectedAction({
          startingNodeId: connectionInfo.fromNode.id,
          position: { x: clientX, y: clientY },
        });
      }
    },
    []
  );

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

      {selectedAction && (
        <ActionSheet
          onSelect={(type, metadata) => {
            const nodeId = Math.random().toString();

            setNodes((prev) => [...prev, {
              id: nodeId,
              type,
              data: {
                kind: "actions",
                metadata,
              },
              position: selectedAction.position,
            }]);

            setEdges((prev) => [...prev, {
              id: `${selectedAction.startingNodeId}--${nodeId}`,
              source: selectedAction.startingNodeId,
              target: nodeId,
            }]);

            setSelectedAction(null);
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
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}