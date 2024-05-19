'use client'
import nodeReducer, { type NodeState } from '@/slices/nodeSlice'
import edgeReducer, { type EdgeState } from '@/slices/edgeSlice'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// Configure Redux store
const store = configureStore({
  reducer: {
    nodes: nodeReducer,
    edges: edgeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Define RootState type
export type RootState = {
  nodes: NodeState // State shape for nodes
  edges: EdgeState // State shape for edges
}

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch

/**
 * Provider component to wrap the application with Redux store.
 *
 * @param {React.ReactNode} children - The children components to be wrapped by the Provider.
 * @returns {React.ReactNode} The wrapped children components with Redux store.
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

export default store
