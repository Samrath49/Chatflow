import React from 'react'
import MessageNode from './MessageNode'

const NodesPanel = () => {
  return (
    <div className='flex h-full w-full min-w-[30rem] grow flex-wrap border-[1px] border-gray-300 p-5'>
      <MessageNode />
    </div>
  )
}

export default NodesPanel
