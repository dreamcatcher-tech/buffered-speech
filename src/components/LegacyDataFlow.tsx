import React from 'react';
import {
  ReactFlow,
  Background,
  EdgeProps,
  BaseEdge,
  getSmoothStepPath,
  MarkerType,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, Users, Store, ShieldCheck } from 'lucide-react';

const CustomNode = ({ data }: { data: { label: string; icon?: React.ElementType } }) => (
  <div className="px-4 py-2 shadow-lg rounded-lg bg-gray-100 border-2 border-gray-400 flex items-center gap-2">
    {data.icon && <data.icon className="w-5 h-5 text-gray-600" />}
    <div className="font-bold text-gray-700">{data.label}</div>
  </div>
);

const edgeStyle: React.CSSProperties = {
  stroke: '#64748b',
  strokeWidth: 2,
  strokeDasharray: '4,4',
};

function LegacyEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, label } = props;
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={edgeStyle}
      />
      {label && (
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2 - 10}
          textAnchor="middle"
          className="fill-gray-600 text-sm"
        >
          {label}
        </text>
      )}
    </>
  );
}

const nodes = [
  {
    id: 'companyA',
    position: { x: 150, y: 50 },
    data: { label: 'BikeShop.co', icon: Store },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'companyB',
    position: { x: 450, y: 50 },
    data: { label: 'KiwiInsurance', icon: ShieldCheck },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'customersA',
    position: { x: 150, y: 180 },
    data: { label: 'Local Customer DB', icon: Database },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'customersB',
    position: { x: 450, y: 180 },
    data: { label: 'Local Customer DB', icon: Database },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'usersA',
    position: { x: 150, y: 310 },
    data: { label: 'Customer #45678 (Outdated)', icon: Users },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'usersB',
    position: { x: 450, y: 310 },
    data: { label: 'Customer #45678 (Outdated)', icon: Users },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
];

const edges = [
  {
    id: 'a-to-db',
    source: 'companyA',
    target: 'customersA',
    type: 'legacyEdge',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Stores PII',
  },
  {
    id: 'b-to-db',
    source: 'companyB',
    target: 'customersB',
    type: 'legacyEdge',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Stores PII',
  },
  {
    id: 'dbA-to-users',
    source: 'customersA',
    target: 'usersA',
    type: 'legacyEdge',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Fragmented View',
  },
  {
    id: 'dbB-to-users',
    source: 'customersB',
    target: 'usersB',
    type: 'legacyEdge',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Fragmented View',
  },
];

const proOptions = { hideAttribution: true };

export default function LegacyDataFlow() {
  return (
    <div className="w-[800px] h-[400px] rounded-xl overflow-hidden shadow-lg bg-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ custom: CustomNode }}
        edgeTypes={{ legacyEdge: LegacyEdge }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        panOnDrag={false}
        nodesDraggable={false}
        proOptions={proOptions}
      >
        <Background variant="dots" gap={12} size={1} color="#64748b" />
      </ReactFlow>
    </div>
  );
}