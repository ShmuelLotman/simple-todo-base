import styled from 'styled-components'

export const BaseModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.gray.modal};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledBaseModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.border.radius.default};
  width: clamp(400px, 500px, 600px);
  height: clamp(400px, 450px, 600px);
  position: relative;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  height: 32px;
  width: 32px;
  border-radius: ${({ theme }) => theme.border.radius.circle};
  background-color: ${({ theme }) => theme.colors.gray.border};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
