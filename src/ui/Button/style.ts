import styled, { css } from 'styled-components'
import { TButtonProps } from './Button'

export const StyledButton = styled.button<TButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-family: ${({ theme }) => theme.fontFamily};
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${({ theme }) => theme.colors.green.primary};
          color: ${({ theme }) => theme.colors.white};
          box-shadow: ${({ theme }) =>
            theme.shadow('large', theme.colors.green.shadow)};
        `
      default:
        return css`
          background-color: ${({ theme }) => theme.colors.primary};
          box-shadow: ${({ theme }) => theme.shadow.medium};
        `
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: ${({ theme }) => theme.spacing.sm}
            ${({ theme }) => theme.spacing.md};
          font-size: ${({ theme }) => theme.fontSize.sm};
        `
      case 'medium':
        return css`
          padding: ${({ theme }) => theme.spacing.md}
            ${({ theme }) => theme.spacing.lg};
          font-size: ${({ theme }) => theme.fontSize.md};
        `
      case 'large':
        return css`
          padding: ${({ theme }) => theme.spacing.lg}
            ${({ theme }) => theme.spacing.xl};
          font-size: ${({ theme }) => theme.fontSize.lg};
        `
      default:
        return css`
          padding: ${({ theme }) => theme.spacing.sm}
            ${({ theme }) => theme.spacing.md};
          font-size: ${({ theme }) => theme.fontSize.md};
        `
    }
  }}

  ${({ shape }) => {
    switch (shape) {
      case 'rounded':
        return css`
          border-radius: ${({ theme }) => theme.border.radius.small};
        `
      case 'pill':
        return css`
          border-radius: ${({ theme }) => theme.border.radius.pill};
        `
      default:
        return css`
          border-radius: ${({ theme }) => theme.border.radius.medium};
        `
    }
  }}

  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: ${({ theme }) => theme.colors.gray.borderDisabled};
      `
    }
  }}
`
