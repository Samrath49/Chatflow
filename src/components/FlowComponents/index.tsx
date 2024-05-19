'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
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

export default function App() {
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

  const onConnect = useCallback(
    params => {
      handleConnect(params, setEdges)
    },
    [setEdges]
  )

  const onInit = reactFlowInstance => setReactFlowInstance(reactFlowInstance)

  const onDragOver = handleDragOver

  const onDrop = event =>
    handleDrop(event, flowRef, reactFlowInstance, dispatch, () =>
      getId(storeNodes, nodes)
    )

  const onNodesDelete = useCallback(
    deletedNodes =>
      handleNodesDelete(
        deletedNodes,
        nodes,
        edges,
        dispatch,
        setNodes,
        setEdges
      ),
    [nodes, edges, dispatch, setNodes, setEdges]
  )

  const handleKeyDownCallback = useCallback(
    event => handleKeyDown(event, nodes, onNodesDelete),
    [nodes, onNodesDelete]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownCallback)
    return () => {
      document.removeEventListener('keydown', handleKeyDownCallback)
    }
  }, [handleKeyDownCallback])

  useEffect(() => {
    if (storeNodes.length === 0 && initialNodes.length > 0) {
      if (typeof window !== 'undefined') {
        const savedNodes = JSON.parse(localStorage.getItem('savedNodes'))
        if (!savedNodes) {
          dispatch(loadNodes(initialNodes))
        }
      }
    } else {
      setNodes(storeNodes)
    }
  }, [dispatch, storeNodes, setNodes])

  useEffect(() => {
    if (edges?.length > 0) {
      dispatch(loadEdges(edges))
    }
  }, [dispatch, edges])

  useEffect(() => {
    if (storeEdges.length === 0 && initialEdges.length > 0) {
      if (typeof window !== 'undefined') {
        const savedEdges = JSON.parse(localStorage.getItem('savedEdges'))
        if (!savedEdges) {
          dispatch(loadEdges(initialEdges))
        }
      }
    } else {
      setEdges(storeEdges)
    }
  }, [dispatch, storeEdges, setEdges])

  useEffect(() => {
    const node = nodes.find(node => node.selected)
    if (node) {
      dispatch(updateSelectedNodeId(node?.id))
    } else {
      dispatch(updateSelectedNodeId(null))
    }
  }, [dispatch, nodes])

  useEffect(() => {
    textRef?.current?.focus()
  }, [selectedNodeId])

  return (
    <ReactFlowProvider>
      <div className='h-full grow' ref={flowRef}>
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
      </div>
    </ReactFlowProvider>
  )
}
