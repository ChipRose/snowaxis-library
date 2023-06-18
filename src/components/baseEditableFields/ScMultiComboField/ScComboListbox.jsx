import React from 'react'
import { SnowTypography } from '../../../adapter'
import { SnowCheckIcon } from '../../../adapter'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import styled from 'styled-components'

const ComboListboxView = styled('ul')`
  min-width: 150px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${({ theme }) => theme.mainPalette.color.contrast};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.mainPalette.grey.shadow};
  z-index: 1;
`

const ComboListItemView = styled('li')`
  padding: 5px 12px;
  display: flex;
  align-items: center;
  :hover {
    background: ${({ theme }) => theme.mainPalette.grey[50]};
  }

  & span {
    flex-grow: 1;
  }

  & svg {
    margin-right: 10px;
    width: 14px;
    height: 14px;
    border: 1px solid ${({ theme }) => theme.mainPalette.grey.dark};
    border-radius: 3px;
    fill: transparent;
  }
}

&[aria-selected='true'] {
  background: ${({ theme }) => theme.mainPalette.grey.light};
  font-weight: 600;

  & svg {
    border: none;
    background: ${({ theme }) => theme.mainPalette.grey.dark};
    fill: ${({ theme }) => theme.mainPalette.grey.light};
  }
}

& .${autocompleteClasses.focused} {
  background-color: ${({ theme }) => theme.mainPalette.color.highlight};
  cursor: pointer;
}
`

export const ScComboListbox = ({
  options = [],
  listProps = {},
  itemProps = {},
  ...props
}) => {
  return (
    <>
      {!!options?.length && (
        <ComboListboxView {...props} {...listProps()}>
          {options.map((option, index) => (
            <ComboListItemView key={index} {...itemProps({ option, index })}>
              <SnowCheckIcon fontSize="small" />
              <SnowTypography component="span">{option.label}</SnowTypography>
            </ComboListItemView>
          ))}
        </ComboListboxView>
      )}
    </>
  )
}
export default ScComboListbox
