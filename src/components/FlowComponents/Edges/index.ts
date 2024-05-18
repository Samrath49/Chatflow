import { MarkerType, type Edge, type EdgeTypes } from 'reactflow'

export const initialEdges = [
  {
    id: '"reactflow__edge-1b-2a"',
    source: '1',
    sourceHandle: 'b',
    target: '2',
    targetHandle: 'a',
    // label: "edge info",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
] satisfies Edge[]

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes
