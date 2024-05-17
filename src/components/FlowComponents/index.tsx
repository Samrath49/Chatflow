'use client'
import type { OnConnect } from 'reactflow'
import { useCallback } from 'react'
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import { initialNodes, nodeTypes } from './Nodes'
import { initialEdges, edgeTypes } from './Edges'

/**
 * React Flow component
 *
 * This is the main component of the app. It uses the React Flow library
 * to render the nodes and edges. It also has controls for zooming and panning.
 *
 */
export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect: OnConnect = useCallback(
    connection => setEdges(edges => addEdge(connection, edges)),
    [setEdges]
  )

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  )
}