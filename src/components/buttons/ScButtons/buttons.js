import React from 'react'
import { SnowButton } from '../../../adapter'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const ButtonBaseView = css`
  &.MuiButtonBase-root {
    color: ${({ theme }) => theme.mainPalette.color.contrast} !important;
    font-weight:  ${({ theme }) => theme.fontWeight.thin};
    white-space: nowrap;
    box-shadow: none;
  }
  &.Mui-disabled {
    color: ${({ theme }) => theme.mainPalette.color.contrast};
    opacity: 0.5;
  }
`

const PrimaryButtonView = styled(SnowButton)`
  background: ${({ theme }) => theme.mainPalette.gradient.primary};
  ${ButtonBaseView}
`

const SecondaryButtonView = styled(SnowButton)`
  background: ${({ theme }) => theme.mainPalette.gradient.secondary};
  ${ButtonBaseView}
`

export const ScPrimaryBtn = ({ label = '', onClick = () => { }, size = 'large', ...props }) => {
  return (
    <PrimaryButtonView
      {...props}
      aria-label={'sc-primary-button'}
      variant={'contained'}
      onClick={onClick}
      size={size}
    >
      {label}
    </PrimaryButtonView>
  )
}
export const ScSecondaryBtn = ({ label = '', onClick = () => { }, size = 'large', ...props }) => {
  const { className, ..._props } = props
  return (
    <SecondaryButtonView
      {..._props}
      onClick={onClick}
      size={size}
    >
      {label}
    </SecondaryButtonView>
  )
}
export const ScOutlinedBtn = ({ label = '', onClick = () => { }, size = 'large', ...props }) => {
  return (
    <SnowButton {...props} onClick={onClick} color={'primary'} variant={'outlined'} size={size} style={{ fontWeight: '300'}}>
      {label}
    </SnowButton>
  )
}

ScPrimaryBtn.propTypes = {
  label: PropTypes.string,

  disabled: PropTypes.bool,

  size: PropTypes.oneOf(['large', 'small', 'medium']),

  onClick: PropTypes.func
}

ScSecondaryBtn.propTypes = { ...ScPrimaryBtn.propTypes }
ScOutlinedBtn.propTypes = { ...ScPrimaryBtn.propTypes }
