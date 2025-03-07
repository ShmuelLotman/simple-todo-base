import React from 'react'

import { StyledButton } from './style'

export type TButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary'
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  shape?: 'rounded' | 'pill'
  loading?: boolean
  disabled?: boolean
  children?: React.ReactNode
  ariaLabel?: string
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  shape = 'rounded',
  loading = false,
  disabled = false,
  children,
  ariaLabel = 'button',
  ...restProps
}: TButtonProps) {
  return (
    <StyledButton variant={variant} size={size} shape={shape} {...restProps}>
      {children}
    </StyledButton>
  )
}
