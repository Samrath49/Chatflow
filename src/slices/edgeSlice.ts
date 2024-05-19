import { initialEdges } from '@/components/FlowComponents/Edges'
import showToast from '@/services/Toast'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Edge } from 'reactflow'

// Define the shape of the state for edges
export interface EdgeState {
  storeEdges: Edge[]
  isDeleted: boolean
  selectedEdgeId: string
}

// Utility function to initialize storeEdges from localStorage
const getInitialEdges = (): Edge[] => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('savedEdges') || '[]')
  }
  return initialEdges
}

// Utility function to save edges to localStorage
const saveEdgesToLocalStorage = (edges: Edge[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('savedEdges', JSON.stringify(edges))
  }
}

// Define the initial state of the edge slice
const initialState: EdgeState = {
  storeEdges: getInitialEdges(),
  isDeleted: false,
  selectedEdgeId: '',
}

// Create a slice for edge management
const edgesSlice = createSlice({
  name: 'edges',
  initialState,
  reducers: {
    // Add a new edge to the store and save to localStorage
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.storeEdges.push(action.payload)
      saveEdgesToLocalStorage(state.storeEdges)
    },
    // Remove an edge by ID from the store and save to localStorage
    removeEdge: (state, action: PayloadAction<string>) => {
      state.storeEdges = state.storeEdges.filter(
        edge => edge.id !== action.payload
      )
      saveEdgesToLocalStorage(state.storeEdges)
    },
    // Update an existing edge in the store and save to localStorage
    updateEdge: (state, action: PayloadAction<Edge>) => {
      const index = state.storeEdges.findIndex(
        edge => edge.id === action.payload.id
      )
      if (index !== -1) {
        state.storeEdges[index] = action.payload
        saveEdgesToLocalStorage(state.storeEdges)
      }
    },
    // Load a set of edges into the store and save to localStorage
    loadEdges: (state, action: PayloadAction<Edge[]>) => {
      state.storeEdges = action.payload
      console.log('@savedEdges', action.payload)
      saveEdgesToLocalStorage(state.storeEdges)
    },
    // Save the current set of edges to localStorage and show a toast notification
    saveEdges: state => {
      saveEdgesToLocalStorage(state.storeEdges)
      showToast('Edges are saved now.', 'success')
    },
    // Update the isDeleted flag in the state
    setEdgesDeleted: (state, action: PayloadAction<boolean>) => {
      state.isDeleted = action.payload
    },
    // Update the selectedEdgeId in the state
    updateSelectedEdgeId: (state, action: PayloadAction<string>) => {
      state.selectedEdgeId = action.payload
    },
  },
})

export const {
  addEdge,
  removeEdge,
  updateEdge,
  loadEdges,
  saveEdges,
  setEdgesDeleted,
  updateSelectedEdgeId,
} = edgesSlice.actions

export default edgesSlice.reducer
