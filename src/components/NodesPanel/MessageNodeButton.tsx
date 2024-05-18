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
    <div
      draggable
      className='flex h-fit min-w-44 cursor-pointer flex-col items-center justify-between gap-2 rounded-lg border-[1px] border-gray-300 p-3'
      onDragStart={event => onDragStart(event, 'node', 'message')}
    >
      <MessageIcon className='h-8 w-8' />
      Message
    </div>
  )
}

export default MessageNodeButton
