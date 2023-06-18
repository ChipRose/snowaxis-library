import React from 'react'
import { SnowLink, SnowTypography, SnowListItem } from '../../../adapter'
import styled from 'styled-components'

const AddListItemLinkView = styled(SnowLink)`
  padding: 2px 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 10px;
  background: ${({theme})=>theme.mainPalette.color.main};
  transition: background ${({theme})=>theme.transition.main};
  :hover {
    background: ${({theme})=>theme.mainPalette.color.secondary};
  }
  cursor: pointer;
  text-decoration: none !important;
`

const AddListItemButtonView = styled.span`
  vertical-align: middle;
  color: ${({theme})=>theme.mainPalette.typography.contrast};
`

const ScAddListItemButton = ({ onClick }) => {
  return (
    <SnowListItem aria-label = {'add-list-item-button'}>
      <AddListItemLinkView onClick={onClick}>
        <AddListItemButtonView>
          +
        </AddListItemButtonView>
      </AddListItemLinkView>
    </SnowListItem>
  )
}

export default ScAddListItemButton
