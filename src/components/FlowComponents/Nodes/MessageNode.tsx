'use client'
import { MessageIcon, WhatsappIcon } from '@/icons'
import React, { memo } from 'react'
import { Handle, Position } from 'reactflow'

const MessageNode = ({ data, selected }) => {
  return (
    <div
      className={`overflow-hidden rounded-lg shadow-xl ${selected ? 'border-2 border-emerald-500 shadow-2xl' : 'border-2 border-transparent'} `}
    >
      <div className='flex flex-col'>
        <div className='flex items-center justify-between gap-20 bg-emerald-100 p-2'>
          <span className='flex items-center gap-2 text-sm font-semibold'>
            <MessageIcon className={'h-4 w-4'} />
            {data.heading}
          </span>
          <div className='flex h-5 w-5 items-center justify-center rounded-full bg-white'>
            <WhatsappIcon className={'h-4 w-4'} />
          </div>
        </div>
        <div className='p-2 text-base bg-white'>{data.content}</div>
      </div>
      <Handle type='source' position={Position.Right} id='b' />
      <Handle type='target' position={Position.Left} id='a' />
    </div>
  )
}

export default memo(MessageNode)
