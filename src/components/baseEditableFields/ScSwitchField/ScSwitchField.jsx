import React from 'react'
import { SnowSwitch, SnowGrid } from '../../../adapter'
import styled from 'styled-components'

const SwitchView = styled(SnowSwitch)`
  .MuiSwitch-switchBase {
    & + .MuiSwitch-track {
      opacity: 1;
      background: ${({ theme }) => theme.mainPalette.grey[100]};
    }
    &.Mui-checked {
      & + .MuiSwitch-track {
        opacity: 1;
        background: ${({ theme }) => theme.mainPalette.color.secondary};
      }
    }
  }
`

export const ScSwitchField = ({ value, onUpdate, labelStart, labelEnd }) => {
  const handleChange = (event) => {
    onUpdate({ value: event.target.checked })
  }
  return (
    <SnowGrid
      component="label"
      container
      alignItems="center"
      spacing={1}
      aria-label={'sc-switch'}
    >
      {labelStart ? <SnowGrid item>{labelStart}</SnowGrid> : null}
      <SnowGrid item>
        <SwitchView checked={value} onChange={handleChange} name="checkedC" />
      </SnowGrid>
      {labelEnd ? <SnowGrid item>{labelEnd}</SnowGrid> : null}
    </SnowGrid>
  )
}

export default ScSwitchField
