'use client'
import { MessageIcon } from '@/icons'
import React from 'react'

const MessageNodeButton = () => {
  const onDragStart = (event, nodeType, content) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.setData('content', content)
    event.dataTransfer.effectAllowed = 'move'
  }
  return (
    <div className='p-5'>
      <div
        draggable
        className='flex h-fit min-w-44 cursor-pointer flex-col items-center justify-between gap-2 rounded-lg border-2 border-gray-300 p-3'
        onDragStart={event => onDragStart(event, 'node', 'message')}
      >
        <MessageIcon className='size-8' />
        Message
      </div>
    </div>
  )
}

export default MessageNodeButton
