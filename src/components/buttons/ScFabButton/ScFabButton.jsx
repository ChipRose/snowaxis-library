import React from 'react'
import { SnowAddIcon, SnowFab } from '../../../adapter'
import styled from 'styled-components'

const FabButtonView = styled(SnowFab)`
  &.MuiFab-extended.MuiFab-sizeSmall {
    padding: 2px 2px 2px ${({ islabeled }) => (islabeled ? '6px' : '0')};
    height: auto;
  }
  &.MuiFab-root {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 1;
    box-shadow: none;
  }
`

export const ScFabButton = ({ label = '', onClick = () => {} }) => {
  return (
    <FabButtonView
      size="small"
      variant={label ? 'extended' : 'circular'}
      aria-label="add"
      onClick={onClick}
      islabeled={label ? 1 : 0}
    >
      {label}
      <SnowAddIcon fontSize="small" />
    </FabButtonView>
  )
}
export default ScFabButton
