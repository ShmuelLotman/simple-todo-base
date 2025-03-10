import styled from 'styled-components'

export const StatusColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: clamp(300px, 320px, 350px);
  height: 100%;
  border-radius: ${({ theme }) => theme.border.radius.xlarge};
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.border.width.small} solid
    ${({ theme }) => theme.colors.gray.border};
  padding: 10px;
  height: 100%;
  min-width: 300px;
`

export const StatusColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StatusColumnTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.gray.textDark};
`

export const StatusColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.red.primary};
`
