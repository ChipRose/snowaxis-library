import React from 'react'
import { ScPrimaryBtn, ScSecondaryBtn } from '../../buttons'
import {
  SnowDialog,
  SnowDialogActions,
  SnowDialogContentText,
  SnowPaper,
  SnowTypography,
  SnowWarningIcon,
  SnowResyncIcon
} from '../../../adapter'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const ConfirmationAlertView = styled(SnowDialog)`
  position: relative;
  .MuiDialog-paper {
    ${({ theme, width }) => `
      padding: ${theme.indent.secondary};
      width: ${width ? `${width}px` : '500px'};
      background: ${theme.mainPalette.grey.light};
    `}
  }
`

const ConfirmationAlertHeaderView = styled.div`
  padding: ${({ theme }) => theme.indent.secondary};
  display: flex;
  justify-content: center;
  svg {
    width: 40px;
    height: auto;
  }
`

const ConfirmationAlertPaperView = styled(SnowPaper)`
  ${({ theme }) => css`
    padding: ${theme.indent.secondary};
    margin-bottom: ${theme.indent.secondary};
  `}
`

const ConfirmationAlertTitleView = styled(SnowTypography)`
  text-align: center;
  &.MuiTypography-root {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.indent.secondary};
    font-weight: ${({ theme }) => theme.fontWeight.main};
  }
`

const ConfirmationAlertActionView = styled(SnowDialogActions)`
  &.MuiDialogActions-root {
    justify-content: center;
  }
`

const ConfirmationAlertLoadingView = styled.div`
  padding: ${({ theme }) => theme.indent.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    width: 24px;
    ${({ theme }) => `
      animation: ${theme.animation.rotation};
    `}
  }
  @keyframes rotation {
    to {
      transform: rotate(360deg);
    }
  }
`

const DialogContentView = styled.div`
  overflow-x: auto;
`

export const ScConfirmationAlert = ({
  open = false,
  message = { title: '', content: '', syncText: '' },
  onClose = () => null,
  onConfirm = () => null,
  loading = false,
  icon = '',
  width = '',
  isIconExist = true,
  labelForConfirmBtn = '',
  labelForCancelBtn = '',
  isHtmlInContent = false,
  confirmProps = {}
}) => {
  const { title, content, syncText } = message ?? {}

  return (
    <ConfirmationAlertView
      open={open}
      width={width}
      onClose={onClose}
      aria-label="alert-dialog"
      aria-describedby="alert-dialog-description"
      disablePortal={true}
      disableScrollLock={true}
    >
      <ConfirmationAlertHeaderView>
        {icon ? icon : isIconExist && <SnowWarningIcon />}
      </ConfirmationAlertHeaderView>
      <ConfirmationAlertPaperView>
        {title ? (
          <ConfirmationAlertTitleView
            component="h3"
            variant="h6"
            id="alert-dialog-title"
          >
            {title}
          </ConfirmationAlertTitleView>
        ) : null}
        {content ? (
          <div>
            {isHtmlInContent ? (
              <SnowDialogContentText
                id="alert-dialog-description"
                dangerouslySetInnerHTML={{ __html: `${content}` }}
              ></SnowDialogContentText>
            ) : (
              <DialogContentView id="alert-dialog-description">
                {content}
              </DialogContentView>
            )}
          </div>
        ) : null}
        {loading ? (
          <ConfirmationAlertLoadingView>
            <SnowTypography variant='subtitle2'>{syncText ? syncText : `Data is syncing`}</SnowTypography>
            <SnowResyncIcon />
          </ConfirmationAlertLoadingView>
        ) : null}
      </ConfirmationAlertPaperView>
      <ConfirmationAlertActionView>
        <ScSecondaryBtn
          style={{ textTransform: 'capitalize', padding: '9px 22px' }}
          onClick={onClose}
          label={labelForCancelBtn ? labelForCancelBtn : 'Cancel'}
        />
        {onConfirm ? (
          <ScPrimaryBtn
            onClick={onConfirm}
            variant="contained"
            label={labelForConfirmBtn ? labelForConfirmBtn : 'OK'}
            style={{ minWidth: '100px', textTransform: 'capitalize' }}
            {...confirmProps}
          />
        ) : null}
      </ConfirmationAlertActionView>
    </ConfirmationAlertView>
  )
}
export default ScConfirmationAlert

ScConfirmationAlert.propTypes = {
  icon: PropTypes.node,
  labelForConfirmBtn: PropTypes.string,
  labelForCancelBtn: PropTypes.string,

  open: PropTypes.bool,
  loading: PropTypes.bool,
  isIconExist: PropTypes.bool,
  isHtmlInContent: PropTypes.bool,

  confirmProps: PropTypes.object,

  message: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.any,
    syncText: PropTypes.string
  }),

  onClose: PropTypes.func,
  onConfirm: PropTypes.func
}
