'use client'
import nodeReducer, { type NodeState } from '@/slices/nodeSlice'
import edgeReducer, { type EdgeState } from '@/slices/edgeSlice'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

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

export type RootState = {
  nodes: NodeState
  edges: EdgeState
}

export type AppDispatch = typeof store.dispatch

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

export default store
