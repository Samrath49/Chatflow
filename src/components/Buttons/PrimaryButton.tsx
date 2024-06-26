import React from 'react'
import { ButtonProps } from './types'

/**
 * PrimaryButton component
 *
 * Primary button for actions.
 *
 * @remarks
 * This component renders a button with a loading spinner when isLoading is true.
 * It takes a single children prop, which is the text to be displayed when the button is not loading.
 */
const typeClassesMap = {
  primary: {
    base: 'bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 disabled:border-emerald-300 disabled:bg-emerald-300',
  },
  danger: {
    base: 'bg-red-500 hover:bg-red-600 focus:bg-red-700 disabled:border-red-300 disabled:bg-red-300',
  },
  warning: {
    base: 'bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 disabled:border-orange-300 disabled:bg-orange-300',
  },
  // Add more type mappings as needed
}

const PrimaryButton = ({
  children,
  type = 'primary',
  isLoading,
}: ButtonProps) => {
  const baseClasses =
    'inline-flex h-10 min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-white transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:shadow-none'
  const typeClasses =
    typeClassesMap[type]?.base || typeClassesMap['primary'].base

  return (
    <button
      className={`${baseClasses} ${typeClasses} ${isLoading ? 'cursor-wait' : ''}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className='relative only:-mx-5'>
          <svg
            className='size-5 animate-spin text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            role='graphics-symbol'
            aria-labelledby='title-10 desc-10'
          >
            <title id='title-10'>Icon title</title>
            <desc id='desc-10'>A more detailed description of the icon</desc>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        </span>
      ) : (
        <>{children}</>
      )}
    </button>
  )
}

export default PrimaryButton
