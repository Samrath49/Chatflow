import { initialNodes } from '@/components/FlowComponents/Nodes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Node } from 'reactflow'

export interface NodeState {
  nodes: Node[]
  isDeleted: boolean
}

// Function to initialize nodes from localStorage
const getInitialNodes = (): Node[] => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('savedNodes') || '[]')
  }
  return initialNodes
}

const initialState: NodeState = {
  nodes: getInitialNodes(),
  isDeleted: false,
}

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload)
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedNodes', JSON.stringify(state.nodes))
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload)
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedNodes', JSON.stringify(state.nodes))
      }
    },
    updateNode: (state, action: PayloadAction<Node>) => {
      const index = state.nodes.findIndex(node => node.id === action.payload.id)
      if (index !== -1) {
        state.nodes[index] = action.payload
        if (typeof window !== 'undefined') {
          localStorage.setItem('savedNodes', JSON.stringify(state.nodes))
        }
      }
    },
    loadNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedNodes', JSON.stringify(state.nodes))
      }
    },
    nodesDeleted: (state, action: PayloadAction<boolean>) => {
      state.isDeleted = action.payload
    },
  },
})

export const { addNode, removeNode, updateNode, loadNodes, nodesDeleted } =
  nodesSlice.actions

export default nodesSlice.reducer
