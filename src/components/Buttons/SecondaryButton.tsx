import React from 'react'
import { ButtonProps } from './types'

/**
 * SecondaryButton component
 *
 * Secondary button for actions.
 *
 * @remarks
 * This component renders a button with a loading spinner when isLoading is true.
 * It takes a single children prop, which is the text to be displayed when the button is not loading.
 */
const SecondaryButton = ({ children, isLoading }: ButtonProps) => {
  return (
    <button className='group inline-flex h-10 min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded border border-blue-500 px-5 text-sm font-medium tracking-wide text-blue-500 transition duration-300 hover:border-blue-600 hover:text-blue-600 focus:border-blue-700 focus:text-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:text-blue-300 disabled:shadow-none'>
      {isLoading ? (
        <span className='relative only:-mx-5'>
          <svg
            className='h-5 w-5 animate-spin text-blue-500 group-hover:text-blue-600 group-focus:text-blue-700'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            role='graphics-symbol'
            aria-labelledby='title-71 desc-71'
          >
            <title id='title-71'>Loading Spinner</title>
            <desc id='desc-71'>A simple loading icon.</desc>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              stroke-width='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default SecondaryButton
