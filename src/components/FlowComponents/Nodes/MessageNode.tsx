'use client'
import { MessageIcon, WhatsappIcon } from '@/icons'
import { RootState } from '@/store'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Handle, Position } from 'reactflow'

const MessageNode = ({ data, selected }) => {
  const { selectedNodeId } = useSelector((state: RootState) => state.nodes)

  return (
    <div
      className={`overflow-hidden rounded-lg shadow-xl ${selected && selectedNodeId !== null ? 'border-2 border-emerald-500 shadow-2xl' : 'border-2 border-transparent'} `}
    >
      <div className='flex flex-col'>
        <div className='flex items-center justify-between gap-20 bg-emerald-100 p-2'>
          <span className='flex items-center gap-2 text-sm font-semibold'>
            <MessageIcon className={'size-4'} />
            {data.heading}
          </span>
          <div className='flex size-5 items-center justify-center rounded-full bg-white'>
            <WhatsappIcon className={'size-4'} />
          </div>
        </div>
        <div className='bg-white p-2 text-base'>{data.content}</div>
      </div>
      <Handle type='source' position={Position.Right} id='b' />
      <Handle type='target' position={Position.Left} id='a' />
    </div>
  )
}

export default memo(MessageNode)
