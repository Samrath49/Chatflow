import React from 'react'
import { IconProps } from '../types'

const ArrowIcon = ({ color = '#000', className }: IconProps): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='14'
      viewBox='0 0 18 14'
      id='arrow'
    >
      <g
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <g stroke={color} strokeWidth='2' transform='translate(-1669 -1321)'>
          <g transform='translate(1670 1322)'>
            <path d='M16 6H0M6 12L0 6l6-6'></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default ArrowIcon
