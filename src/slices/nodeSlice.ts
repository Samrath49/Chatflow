import { initialNodes } from '@/components/FlowComponents/Nodes'
import showToast from '@/services/Toast'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Node } from 'reactflow'

// Interface for the payload when updating a node's message
interface UpdateMessagePayload {
  id: string
  message: string
}

// Define the shape of the state for nodes
export interface NodeState {
  storeNodes: Node[]
  isDeleted: boolean
  selectedNodeId: string
}

// Utility function to initialize storeNodes from localStorage
const getInitialNodes = (): Node[] => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('savedNodes') || '[]')
  }
  return initialNodes
}

// Utility function to save nodes to localStorage
const saveNodesToLocalStorage = (nodes: Node[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('savedNodes', JSON.stringify(nodes))
  }
}

// Define the initial state of the node slice
const initialState: NodeState = {
  storeNodes: getInitialNodes(),
  isDeleted: false,
  selectedNodeId: '',
}
const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    // Add a new node to the store and save to localStorage
    addNode: (state, action: PayloadAction<Node>) => {
      state.storeNodes.push(action.payload)
      saveNodesToLocalStorage(state.storeNodes)
    },
    // Remove a node by ID from the store and save to localStorage
    removeNode: (state, action: PayloadAction<string>) => {
      state.storeNodes = state.storeNodes.filter(
        node => node.id !== action.payload
      )
      saveNodesToLocalStorage(state.storeNodes)
    },
    // Update an existing node in the store and save to localStorage
    updateNode: (state, action: PayloadAction<Node>) => {
      const index = state.storeNodes.findIndex(
        node => node.id === action.payload.id
      )
      if (index !== -1) {
        state.storeNodes[index] = action.payload
        saveNodesToLocalStorage(state.storeNodes)
      }
    },
    // Update the message of an existing node
    updateNodeMessage: (state, action: PayloadAction<UpdateMessagePayload>) => {
      const node = state.storeNodes.find(node => node.id === action.payload.id)
      if (node) {
        node.data.content = action.payload.message
      }
    },
    // Load a set of nodes into the store and save to localStorage
    loadNodes: (state, action: PayloadAction<Node[]>) => {
      state.storeNodes = action.payload
      saveNodesToLocalStorage(state.storeNodes)
    },
    // Save the current set of nodes to localStorage and show a toast notification
    saveNodes: state => {
      saveNodesToLocalStorage(state.storeNodes)
      showToast('Nodes are saved now.', 'success')
    },
    // Update the isDeleted flag in the state
    setNodesDeleted: (state, action: PayloadAction<boolean>) => {
      state.isDeleted = action.payload
    },
    // Update the selectedNodeId in the state
    updateSelectedNodeId: (state, action: PayloadAction<string>) => {
      state.selectedNodeId = action.payload
    },
  },
})

// Export actions for use in components
export const {
  addNode,
  removeNode,
  updateNode,
  loadNodes,
  saveNodes,
  setNodesDeleted,
  updateNodeMessage,
  updateSelectedNodeId,
} = nodesSlice.actions

// Export the reducer to be included in the store
export default nodesSlice.reducer
