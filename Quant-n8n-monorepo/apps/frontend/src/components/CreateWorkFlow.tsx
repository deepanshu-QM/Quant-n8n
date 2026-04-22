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
import { Lighter, type TradingMetadata } from '@/nodes/actions/Lighter';
import { Backpack } from '@/nodes/actions/Backpack';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';

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
  "Lighter" : Lighter,
  "backpack" : Backpack,
  "hyperliquid" : Hyperliquid
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

  const POSITION_OFFSET = 50
  const onConnectEnd = useCallback(
    (_event: MouseEvent | TouchEvent, connectionInfo: any) => {
      if (!connectionInfo.isValid) {
        setSelectedAction({
          startingNodeId: connectionInfo.fromNode.id,
          position: { 
            x: connectionInfo.from.x + POSITION_OFFSET,
            y: connectionInfo.from.y + POSITION_OFFSET
          },
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