import { addEdge, MarkerType } from 'reactflow'
import type { Node, Edge } from 'reactflow'
import { Dispatch } from 'redux'
import {
  loadNodes,
  addNode,
  setNodesDeleted,
  updateSelectedNodeId,
} from '@/slices/nodeSlice'
import { loadEdges } from '@/slices/edgeSlice'

// Function to handle new edge connections
export const handleConnect = (params, setEdges) => {
  setEdges(eds => {
    return addEdge(
      {
        ...params,
        markerEnd: { type: MarkerType.Arrow },
      },
      eds
    )
  })
}

// Function to generate unique ID for new nodes
export const getId = (storeNodes, nodes) => {
  if (storeNodes?.length > nodes?.length) {
    return storeNodes.length.toString()
  }
  return nodes?.length.toString()
}

// Function to handle drag over event
export const handleDragOver = event => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

// Function to handle drop event
export const handleDrop = (
  event,
  flowRef,
  reactFlowInstance,
  dispatch: Dispatch,
  getId: () => string
) => {
  event.preventDefault()
  const reactFlowBounds = flowRef.current.getBoundingClientRect()
  const type =
    'messageNode' || event.dataTransfer.getData('application/reactflow')
  const label = event.dataTransfer.getData('content')
  const position = reactFlowInstance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  })
  const newNode: Node = {
    id: getId(),
    type,
    position,
    data: { heading: 'Send Message', content: label },
  }
  dispatch(addNode(newNode))
  dispatch(updateSelectedNodeId(newNode.id))
}

// Function to handle node deletion
export const handleNodesDelete = (
  deletedNodes,
  nodes,
  edges,
  dispatch: Dispatch,
  setNodes,
  setEdges
) => {
  const remainingNodes = nodes.filter(node => !deletedNodes.includes(node))
  const remainingEdges = edges.filter(
    edge =>
      !deletedNodes.some(
        node => edge.source === node.id || edge.target === node.id
      )
  )
  dispatch(loadNodes(remainingNodes))
  dispatch(loadEdges(remainingEdges))
  dispatch(setNodesDeleted(true))
  setNodes(remainingNodes)
  setEdges(remainingEdges)
}

// Function to handle key down event (for deleting nodes)
export const handleKeyDown = (event, nodes, handleNodesDelete) => {
  if (event.key === 'Delete') {
    const selectedNodes = nodes.filter(node => node.selected)
    if (selectedNodes.length > 0) {
      handleNodesDelete(selectedNodes)
    }
  }
}

// Function to get the selected node from the list of nodes using the selectedNodeId
export const getSelectedNode = (nodes: Node[], selectedNodeId: string) => {
  return nodes.find(node => node.id === selectedNodeId)
}

export function validateFlow(
  nodes: Node[],
  edges: Edge[]
): { isValid: boolean; errors: string[] } {
  const allSourceNodes = edges.map(edge => edge.source)
  const allTargetNodes = edges.map(edge => edge.target)
  const errors: string[] = []

  // Check if no nodes and edges are provided
  if (nodes.length === 0 || edges.length === 0) {
    errors.push('Invalid flow. No nodes found.')
  } else {
    // Check if each source node is connected to exactly one edge
    const invalidSourceNodes = allSourceNodes.filter(sourceNode => {
      const count = allSourceNodes.filter(node => node === sourceNode).length
      return count !== 1
    })
    if (invalidSourceNodes.length > 0) {
      errors.push('Some nodes have multiple outgoing edges.')
    }

    // Check if each target node is connected to at least one edge
    const invalidTargetNodes = nodes.filter(node => {
      // Exclude the initial node from this check
      if (allSourceNodes.length > 0 && !allSourceNodes.includes(node.id)) {
        return !allTargetNodes.includes(node.id)
      }
      return false
    })
    if (invalidTargetNodes.length > 0) {
      errors.push('Some nodes are not connected to any incoming edges.')
    }

    // Check for cycles
    const hasCycle = edges.some(edge => {
      const visited: Set<string> = new Set()
      const stack: string[] = [edge.source]
      while (stack.length) {
        const current = stack.pop()!
        if (visited.has(current)) return true // Cycle detected
        visited.add(current)
        const outgoingEdges = edges.filter(e => e.source === current)
        outgoingEdges.forEach(e => stack.push(e.target))
      }
      return false
    })
    if (hasCycle) {
      errors.push('The flow contains a cycle.')
    }
  }

  // Combine all checks
  const isValid = errors.length === 0

  return {
    isValid,
    errors,
  }
}
