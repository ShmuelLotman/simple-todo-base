import styled from 'styled-components'

export const TodoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${({ theme }) => theme.border.radius.medium};
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.border.width.small} solid
    ${({ theme }) => theme.colors.gray.border};
  padding: 10px;
`

export const TodoCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const TodoCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.gray.textDark};
  gap: 10px;
  margin-bottom: 10px;
`

export const TodoCardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.gray.textDark};
  gap: 10px;
`

export const TodoCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`

export const TodoCardDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.gray.textDark};
  text-decoration: italic;
`

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.red.primary};
`

export const EditButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue.primary};
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`
