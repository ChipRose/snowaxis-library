import React from 'react'
import {
  SnowDialog,
  SnowDialogContent,
  SnowDialogActions,
  SnowTypography
} from '../../../adapter'
import { ScPrimaryBtn, ScSecondaryBtn } from '../../buttons'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const BasicModalHeadView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => `
    padding: ${theme.indent.secondary};
    margin-bottom: ${theme.indent.main};
    background: ${theme.mainPalette.grey.soLight};
    box-shadow: ${theme.shadow.decorative};
    border-radius: 5px 5px 0 0;
  `}
`

const BasicModalHeadFormView = styled.div`
  min-width: 200px;
  margin-left: ${({ theme }) => theme.indent.secondary};
  flex: 0 0 auto;
`

const BasicModalActionsView = styled(SnowDialogActions)`
  &.MuiDialogActions-root {
    justify-content: center;
    padding: ${({ theme }) => theme.indent.secondary};
  }
`

export const ScBasicModal = ({
  open = false,
  onClose = () => null,
  onConfirm = () => null,
  message = { title: '', content: '' },
  headForm = '',
  actions = '',
  labelForConfirmBtn = '',
  labelForCancelBtn = '',
  confirmProps = { disabled: false },
  maxWidth = 'md'
}) => {
  const { title, content } = message ?? {}

  return (
    <SnowDialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog"
      fullWidth
      maxWidth={maxWidth}
      sx={{ overflowY: 'visible' }}
      PaperProps={{ style: { overflowY: 'visible' } }}
    >
      {title ? (
        <BasicModalHeadView>
          <SnowTypography variant="h6" component="h3" fontWeight={500}>
            {title}
          </SnowTypography>
          {headForm ? (
            <BasicModalHeadFormView>{headForm}</BasicModalHeadFormView>
          ) : null}
        </BasicModalHeadView>
      ) : null}
      {content ? (
        <SnowDialogContent style={{ overflowY: 'scroll' }}>
          {content}
        </SnowDialogContent>
      ) : null}
      {
        <BasicModalActionsView>
          {actions ? (
            actions
          ) : (
            <>
              <ScSecondaryBtn
                label={labelForCancelBtn ? labelForCancelBtn : 'Cancel'}
                onClick={onClose}
                style={{ padding: '9px 11px', minWidth: '100px' }}
              />
              {onConfirm ? (
                <ScPrimaryBtn
                  label={labelForConfirmBtn ? labelForConfirmBtn : 'OK'}
                  onClick={onConfirm}
                  {...confirmProps}
                  style={{ minWidth: '100px' }}
                />
              ) : null}
            </>
          )}
        </BasicModalActionsView>
      }
    </SnowDialog>
  )
}
export default ScBasicModal

ScBasicModal.propTypes = {
  labelForConfirmBtn: PropTypes.string,
  labelForCancelBtn: PropTypes.string,

  open: PropTypes.bool,

  headForm: PropTypes.node,
  actions: PropTypes.node,

  confirmProps: PropTypes.object,

  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  message: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.any,
    syncText: PropTypes.string
  }),

  onConfirm: PropTypes.func,
  onClose: PropTypes.func
}
