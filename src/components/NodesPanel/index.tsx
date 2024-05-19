'use client'
import React from 'react'
import MessageNodeButton from './MessageNodeButton'
import NodeSettings from './NodeSettings'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const NodesPanel = () => {
  const selectedNodeId = useSelector(
    (state: RootState) => state.nodes.selectedNodeId
  )

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
