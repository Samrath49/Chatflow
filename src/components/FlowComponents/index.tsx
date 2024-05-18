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
import { loadNodes } from '@/slices/nodeSlice'

export default function App() {
  const dispatch = useDispatch()
  const flowRef = useRef(null)
  const textRef = useRef(null)

  // State from Redux store
  const storeNodes = useSelector((state: RootState) => state.nodes.nodes)

  // Local state hooks
  const [nodeText, setNodeText] = useState('')
  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const [isSelected, setIsSelected] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [nodeName, setNodeName] = useState('Node 1')

  console.log('@state', storeNodes, edges)

  const onConnect = useCallback(
    params => handleConnect(params, setEdges),
    [setEdges]
  )

  const onInit = reactFlowInstance => setReactFlowInstance(reactFlowInstance)

  const onDragOver = handleDragOver

  const onDrop = event =>
    handleDrop(
      event,
      flowRef,
      reactFlowInstance,
      dispatch,
      () => getId(storeNodes, nodes),
      setSelectedNode
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
      dispatch(loadNodes(initialNodes))
    } else {
      setNodes(storeNodes)
    }
  }, [dispatch, storeNodes, initialNodes, setNodes])

  useEffect(() => {
    const node = nodes.find(node => node.selected)
    if (node) {
      setSelectedNode(node)
      setIsSelected(true)
    } else {
      setSelectedNode(null)
      setIsSelected(false)
    }
  }, [nodes])

  useEffect(() => {
    setNodeName(selectedNode?.data?.content || '')
  }, [selectedNode])

  useEffect(() => {
    textRef?.current?.focus()
  }, [selectedNode])

  useEffect(() => {
    setNodes(nds =>
      nds.map(node => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: { ...node.data, content: nodeName || ' ' },
          }
        }
        return node
      })
    )
  }, [nodeName, setNodes])

  return (
    <ReactFlowProvider>
      <div className='h-full flex-grow' ref={flowRef}>
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
