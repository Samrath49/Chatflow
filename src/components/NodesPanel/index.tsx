'use client'
import React, { useEffect, useState } from 'react'
import MessageNodeButton from './MessageNodeButton'
import NodeSettings from './NodeSettings'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getSelectedNode } from '../FlowComponents/actions'

const NodesPanel = () => {
  const { storeNodes, selectedNodeId } = useSelector(
    (state: RootState) => state.nodes
  )
  const [selectedNode, setSelectedNode] = useState(null)

  useEffect(() => {
    if (!!selectedNode) {
      setSelectedNode(getSelectedNode(storeNodes, selectedNodeId))
    }
  }, [storeNodes, selectedNode, selectedNodeId])

  return (
    <div className='flex size-full min-w-[30rem] grow flex-wrap border-2 border-gray-300'>
      {selectedNodeId !== null && selectedNodeId !== '' ? (
        <NodeSettings />
      ) : (
        <MessageNodeButton />
      )}
    </div>
  )
}

export default NodesPanel
