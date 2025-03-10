import { CloseIcon } from '@/svgs/CloseIcon'
import { BaseModalOverlay, StyledBaseModal, CloseButton } from './style'

export function BaseModal({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose: () => void
}) {
  return (
    <BaseModalOverlay>
      <StyledBaseModal>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        {children}
      </StyledBaseModal>
    </BaseModalOverlay>
  )
}
