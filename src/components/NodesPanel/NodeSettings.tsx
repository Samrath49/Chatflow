'use client'
import { ArrowIcon } from '@/icons'
import { updateSelectedNodeId } from '@/slices/nodeSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import EditNodeMessage from './EditNodeMessage'

const NodeSettings = () => {
  const dispatch = useDispatch()

  const handleNodeDeselect = () => {
    dispatch(updateSelectedNodeId(null))
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='flex w-full items-center border-2 border-b-gray-200'>
        <button className='p-2' onClick={() => handleNodeDeselect()}>
          <ArrowIcon />
        </button>
        <span className='grow text-center font-medium'>Message</span>
      </div>
      <div className='w-full p-4'>
        <EditNodeMessage />
      </div>
    </div>
  )
}

export default NodeSettings
