import styled from 'styled-components'
import { PlusIcon } from 'lucide-react'
export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 48px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const BoardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const BoardInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  gap: 20px;
  overflow-x: auto;
`

export const HeaderText = styled.h2`
  font-size: 23px;
  font-weight: ${({ theme }) => theme.fontWeight.black};
  color: ${({ theme }) => theme.text.primary};
  line-height: 34px;
`

export const AddActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 2px 2px 12px 0px #00152e05;
  border: 1px solid ${({ theme }) => theme.colors.gray.border};
  border-radius: ${({ theme }) => theme.border.radius.pill};
  padding: 0 12px;
  width: 120px;
  height: 40px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};
  min-width: max-content;
`

export const StyledPlus = styled(PlusIcon)`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.green.primary};
`
