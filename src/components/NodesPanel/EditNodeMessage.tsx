'use client'
import { RootState } from '@/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedNode } from '../FlowComponents/actions'
import { updateNodeMessage } from '@/slices/nodeSlice'
import useDebounce from '@/services/useDebounce'

const EditNodeMessage = () => {
  const { storeNodes, selectedNodeId } = useSelector(
    (state: RootState) => state.nodes
  )
  
  const [nodeMessageText, setNodeMessageText] = useState('')
  const dispatch = useDispatch()

  const debouncedNodeMessageText = useDebounce(nodeMessageText, 2000)

  useEffect(() => {
    if (selectedNodeId) {
      const node = getSelectedNode(storeNodes, selectedNodeId)
      setNodeMessageText(node?.data?.content || '')
    }
  }, [storeNodes, selectedNodeId])

  useEffect(() => {
    if (debouncedNodeMessageText !== '') {
      dispatch(
        updateNodeMessage({
          id: selectedNodeId,
          message: debouncedNodeMessageText,
        })
      )
    }
  }, [debouncedNodeMessageText, dispatch, selectedNodeId])

  const handleMessageChange = e => {
    setNodeMessageText(e.target.value)
  }

  return (
    <div className='relative'>
      <textarea
        id='id-01'
        name='id-01'
        placeholder='Write your message.'
        rows={3}
        value={nodeMessageText}
        onChange={handleMessageChange}
        className='peer relative w-full rounded border border-slate-200 px-4 py-2 text-sm text-slate-500 outline-none transition-all placeholder:text-transparent autofill:bg-white invalid:border-orange-500 invalid:text-orange-700 focus:border-emerald-500 focus:outline-none invalid:focus:border-orange-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400'
      ></textarea>
      <label
        htmlFor='id-01'
        className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:size-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-orange-500 peer-required:after:content-['\00a0*'] peer-invalid:text-orange-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-orange-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
      >
        Write your message
      </label>
    </div>
  )
}

export default EditNodeMessage
