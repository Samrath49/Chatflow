import { initialNodes } from '@/components/FlowComponents/Nodes'
import showToast from '@/services/Toast'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Node } from 'reactflow'

interface UpdateMessagePayload {
  id: string
  message: string
}
export interface NodeState {
  storeNodes: Node[]
  isDeleted: boolean
  selectedNodeId: string
}

// Function to initialize storeNodes from localStorage
const getInitialNodes = (): Node[] => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('savedNodes') || '[]')
  }
  return initialNodes
}

const initialState: NodeState = {
  storeNodes: getInitialNodes(),
  isDeleted: false,
  selectedNodeId: '',
}

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.storeNodes.push(action.payload)
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedNodes', JSON.stringify(state.storeNodes))
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.storeNodes = state.storeNodes.filter(
        node => node.id !== action.payload
      )
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedNodes', JSON.stringify(state.storeNodes))
      }
    },
    updateNode: (state, action: PayloadAction<Node>) => {
      const index = state.storeNodes.findIndex(
        node => node.id === action.payload.id
      )
      if (index !== -1) {
        state.storeNodes[index] = action.payload
        if (typeof window !== 'undefined') {
          localStorage.setItem('savedNodes', JSON.stringify(state.storeNodes))
        }
      }
    },
    updateNodeMessage: (state, action: PayloadAction<UpdateMessagePayload>) => {
      const node = state.storeNodes.find(node => node.id === action.payload.id)
      if (node) {
        node.data.content = action.payload.message
      }
    },
    loadNodes: (state, action: PayloadAction<Node[]>) => {
      state.storeNodes = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedNodes', JSON.stringify(state.storeNodes))
      }
    },
    saveNodes: state => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('savedNodes', JSON.stringify(state.storeNodes))
      }
      showToast('Nodes are saved now.', 'success')
    },
    nodesDeleted: (state, action: PayloadAction<boolean>) => {
      state.isDeleted = action.payload
    },
    updateSelectedNodeId: (state, action: PayloadAction<string>) => {
      state.selectedNodeId = action.payload
    },
  },
})

export const {
  addNode,
  removeNode,
  updateNode,
  loadNodes,
  saveNodes,
  nodesDeleted,
  updateNodeMessage,
  updateSelectedNodeId,
} = nodesSlice.actions

export default nodesSlice.reducer
