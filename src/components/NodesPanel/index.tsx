import React from 'react'
import MessageNodeButton from './MessageNodeButton'

const NodesPanel = () => {
  return (
    <div className='flex size-full min-w-[30rem] grow flex-wrap border-[1px] border-gray-300 p-5'>
      <MessageNodeButton />
    </div>
  )
}

export default NodesPanel
