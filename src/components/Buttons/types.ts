import { ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  isLoading?: boolean
  onClick?: () => void
  type?: string
}
