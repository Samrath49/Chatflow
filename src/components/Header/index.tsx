'use client'
import React from 'react'
import SecondaryButton from '../Buttons/SecondaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { saveNodes } from '@/slices/nodeSlice'
import { saveEdges } from '@/slices/edgeSlice'
import { RootState } from '@/store'
import { validateFlow } from '../FlowComponents/actions'
import showToast from '@/services/Toast'

/**
 * Header component
 *
 * Renders the site header with the ChartFlow title and a Save Changes button.
 */
const Header = () => {
  const dispatch = useDispatch()
  const { storeNodes } = useSelector((state: RootState) => state.nodes)
  const { storeEdges } = useSelector((state: RootState) => state.edges)

  const handleSaveNodes = () => {
    const { isValid, errors } = validateFlow(storeNodes, storeEdges)
    if (isValid) {
      dispatch(saveNodes())
      dispatch(saveEdges())
    } else {
      errors.map(error => {
        showToast(error, 'error')
      })
    }
  }

  return (
    <header className='w-full bg-gradient-to-b from-gray-50 to-gray-200'>
      <nav
        className='mx-auto flex max-w-full items-center justify-between py-4 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <span className='font-serif text-2xl font-bold text-blue-800'>
            ChatFlow
          </span>
        </div>

        <div className='flex flex-1 justify-end'>
          <SecondaryButton onClick={() => handleSaveNodes()}>
            Save changes
          </SecondaryButton>
        </div>
      </nav>
    </header>
  )
}

export default Header
