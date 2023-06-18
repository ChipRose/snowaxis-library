import React from 'react'
import { SnowInputBase } from '../../../adapter'
import { ScFieldLabel } from '../../layout'
import styled from 'styled-components'

const BaseTextFieldView = styled(SnowInputBase)`
  &.MuiInputBase-root {
    padding: 0;
    min-width: 10%;
    max-width: 100%;
    flex: 1 1 20%;
  }
  .MuiInputBase-input {
    width: 100%;
    padding: 9px 10px;
    min-height: 40px;
    box-sizing: border-box;
    color: inherit;
    ${({ theme, fontSize, fontWeight }) => `
      transition: box-shadow ${theme.transition.main};
      font-size: ${fontSize ? fontSize : theme.fontSize.main}; 
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin}; 
    `}
    :focus {
      box-shadow: inset 0 -2px ${({ theme, iserror }) => (iserror ? theme.mainPalette.warning.secondary : theme.mainPalette.grey[200])};
    }
  }
`

export const ScBaseTextField = (props) => {
  const { inputProps, rest } = props
  return (
    <ScFieldLabel {...rest}>
      <BaseTextFieldView {...inputProps} />
    </ScFieldLabel>
  )
}

export default ScBaseTextField
