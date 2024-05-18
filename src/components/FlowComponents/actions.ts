import { addEdge, MarkerType, Node } from 'reactflow'
import { Dispatch } from 'redux'
import {
  loadNodes,
  addNode,
  nodesDeleted,
  updateSelectedNodeId,
} from '@/slices/nodeSlice'

// Function to handle new edge connections
export const handleConnect = (params, setEdges) => {
  setEdges(eds => {
    console.log('@edge', eds)
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
  console.log('@remaining', remainingNodes)
  dispatch(loadNodes(remainingNodes))
  dispatch(nodesDeleted(true))
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
