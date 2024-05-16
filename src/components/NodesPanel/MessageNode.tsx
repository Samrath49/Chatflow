import { MessageIcon } from '@/icons'
import React from 'react'

const MessageNode = () => {
  return (
    <div className='flex h-fit min-w-44 cursor-pointer flex-col items-center justify-between gap-2 rounded-lg border-[1px] border-gray-300 p-3'>
      <MessageIcon className='h-8 w-8' />
      Message
    </div>
  )
}

export default MessageNode
