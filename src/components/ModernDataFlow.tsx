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
import { Database, Users, Store, ShieldCheck, Wallet } from 'lucide-react';

const CustomNode = ({ data }: { data: { label: string; icon?: React.ElementType } }) => (
  <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-indigo-500 flex items-center gap-2">
    {data.icon && <data.icon className="w-5 h-5 text-indigo-600" />}
    <div className="font-bold text-indigo-900">{data.label}</div>
  </div>
);

const animatedEdgeStyle: React.CSSProperties = {
  stroke: '#6c63ff',
  strokeDasharray: '4,4',
  animation: 'dash-pulse 1.5s infinite linear'
};

const globalStyles = `
@keyframes dash-pulse {
  0%   { stroke-dashoffset: 0;   stroke-width: 2px; }
  50%  { stroke-dashoffset: -16; stroke-width: 3px; }
  100% { stroke-dashoffset: -32; stroke-width: 2px; }
}
`;

function AnimatedEdge(props: EdgeProps) {
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
        style={animatedEdgeStyle}
      />
      {label && (
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2 - 10}
          textAnchor="middle"
          className="fill-indigo-600 text-sm font-medium"
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
    id: 'raytio',
    position: { x: 300, y: 180 },
    data: { label: 'Raytio Vault', icon: Wallet },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'sharedUsers',
    position: { x: 300, y: 310 },
    data: { label: 'Customer #45678 (Single Source of Truth)', icon: Users },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
];

const edges = [
  {
    id: 'a-to-raytio',
    source: 'companyA',
    target: 'raytio',
    type: 'animatedEdge',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Delegate PII Storage',
  },
  {
    id: 'b-to-raytio',
    source: 'companyB',
    target: 'raytio',
    type: 'animatedEdge',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Delegate PII Storage',
  },
  {
    id: 'raytio-to-users',
    source: 'raytio',
    target: 'sharedUsers',
    type: 'animatedEdge',
    markerEnd: { type: MarkerType.ArrowClosed },
    label: 'Single Source of Truth',
  },
];

const proOptions = { hideAttribution: true };

export default function ModernDataFlow() {
  React.useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = globalStyles;
    document.head.appendChild(styleEl);
    return () => { document.head.removeChild(styleEl); };
  }, []);

  return (
    <div className="w-[800px] h-[400px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ custom: CustomNode }}
        edgeTypes={{ animatedEdge: AnimatedEdge }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        panOnDrag={false}
        nodesDraggable={false}
        proOptions={proOptions}
      >
        <Background variant="dots" gap={12} size={1} color="#818cf8" />
      </ReactFlow>
    </div>
  );
}