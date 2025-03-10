import styled from 'styled-components'
import { Input } from '../ui/input'

export const FilterInputContainer = styled.div`
  > form {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

export const StyledInput = styled(Input)`
  border-radius: ${({ theme }) => theme.border.radius.pill};
  height: 40px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.gray.textDark};
  background: #00152e08;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray.textDark};
    font-style: italic;
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.blue.primary};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray.textDark};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`
export const FilterInputSubmit = styled.button`
  background: ${({ theme }) => theme.colors.blue.primary};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius.circle};
  cursor: pointer;
  padding: 8px;
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.colors.white};
`
