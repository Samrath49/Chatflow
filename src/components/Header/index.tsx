import React from 'react'
import SecondaryButton from '../Buttons/SecondaryButton'

/**
 * Header component
 *
 * Renders the site header with the ChartFlow title and a Save Changes button.
 */
const Header = () => {
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
          <SecondaryButton>Save changes</SecondaryButton>
        </div>
      </nav>
    </header>
  )
}

export default Header
