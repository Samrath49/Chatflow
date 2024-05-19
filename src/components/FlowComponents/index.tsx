'use client'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow'
import { useDispatch, useSelector } from 'react-redux'
import { initialNodes, nodeTypes } from './Nodes'
import { initialEdges, edgeTypes } from './Edges'
import { RootState } from '@/store'
import {
  handleConnect,
  getId,
  handleDragOver,
  handleDrop,
  handleNodesDelete,
  handleKeyDown,
} from './actions'
import { loadNodes, updateSelectedNodeId } from '@/slices/nodeSlice'
import { loadEdges } from '@/slices/edgeSlice'

const App = () => {
  const dispatch = useDispatch()
  const flowRef = useRef(null)
  const textRef = useRef(null)

  // State from Redux store
  const { storeNodes, selectedNodeId } = useSelector(
    (state: RootState) => state.nodes
  )
  const { storeEdges } = useSelector((state: RootState) => state.edges)

  // Local state hooks
  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // Callback to handle edge connections
  const onConnect = useCallback(
    params => {
      handleConnect(params, setEdges)
    },
    [setEdges]
  )

  // Callback to initialize React Flow instance
  const onInit = useCallback(reactFlowInstance => {
    setReactFlowInstance(reactFlowInstance)
  }, [])

  // Callback to handle drag over event
  const onDragOver = useCallback(handleDragOver, [])

  // Callback to handle drop event
  const onDrop = useCallback(
    event => {
      handleDrop(event, flowRef, reactFlowInstance, dispatch, () =>
        getId(storeNodes, nodes)
      )
    },
    [dispatch, flowRef, reactFlowInstance, storeNodes, nodes]
  )

  // Callback to handle node deletion
  const onNodesDelete = useCallback(
    deletedNodes => {
      handleNodesDelete(
        deletedNodes,
        nodes,
        edges,
        dispatch,
        setNodes,
        setEdges
      )
    },
    [dispatch, edges, nodes, setEdges, setNodes]
  )

  // Callback to handle key down event
  const handleKeyDownCallback = useCallback(
    event => {
      handleKeyDown(event, nodes, onNodesDelete)
    },
    [nodes, onNodesDelete]
  )

  // Effect to add and remove keydown event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownCallback)
    return () => {
      document.removeEventListener('keydown', handleKeyDownCallback)
    }
  }, [handleKeyDownCallback])

  // Effect to load initial nodes or set nodes from store
  useEffect(() => {
    if (storeNodes.length === 0 && initialNodes.length > 0) {
      const savedNodes = JSON.parse(localStorage.getItem('savedNodes'))
      if (!savedNodes) {
        dispatch(loadNodes(initialNodes))
      }
    } else {
      setNodes(storeNodes)
    }
  }, [dispatch, setNodes, storeNodes])

  // Effect to load initial edges or set edges from store
  useEffect(() => {
    if (edges.length > 0) {
      dispatch(loadEdges(edges))
    }
  }, [dispatch, edges])

  // Effect to load initial edges or set edges from store
  useEffect(() => {
    if (storeEdges.length === 0 && initialEdges.length > 0) {
      const savedEdges = JSON.parse(localStorage.getItem('savedEdges'))
      if (!savedEdges) {
        dispatch(loadEdges(initialEdges))
      }
    } else {
      setEdges(storeEdges)
    }
  }, [dispatch, setEdges, storeEdges])

  // Effect to update selected node ID when nodes change
  useEffect(() => {
    const node = nodes.find(node => node.selected)
    if (node) {
      dispatch(updateSelectedNodeId(node.id))
    } else {
      dispatch(updateSelectedNodeId(null))
    }
  }, [dispatch, nodes])

  // Effect to focus on text input when selected node ID changes
  useEffect(() => {
    textRef.current?.focus()
  }, [selectedNodeId])

  // Memoized React Flow component to prevent unnecessary re-renders
  const memoizedReactFlow = useMemo(
    () => (
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onInit={onInit}
        edges={edges}
        onNodesDelete={onNodesDelete}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        attributionPosition='top-right'
      >
        <Background color='#fff' />
      </ReactFlow>
    ),
    [
      nodes,
      onNodesChange,
      onInit,
      edges,
      onNodesDelete,
      onEdgesChange,
      onConnect,
      onDrop,
      onDragOver,
    ]
  )

  return (
    <ReactFlowProvider>
      <div className='h-full grow' ref={flowRef}>
        {memoizedReactFlow}
      </div>
    </ReactFlowProvider>
  )
}

export default App
