import React from 'react'
import { SnowTypography } from '../../../adapter'
import { SnowCloseIcon } from '../../../adapter'
import styled from 'styled-components'

const TagView = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background: ${({ theme }) => theme.mainPalette.grey.light};
  border-radius: 12px;
  box-sizing: content-box;
  padding: 0 6px 0 10px;
  outline: 0;
  overflow: hidden;
`

const TagLabelView = styled(SnowTypography).attrs({
  component: 'span'
})`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: uppercase;
`

const TagCloseIconView = styled(SnowCloseIcon)`
  margin-left: 5px;
  border-radius: 50%;
  background: ${({ theme }) => theme.mainPalette.grey.middle};
  &.MuiSvgIcon-root {
    font-size: 10px;
    cursor: pointer;
    fill: ${({ theme }) => theme.mainPalette.grey.light};
    padding: 2px;
  }
`

const ScTag = ({ label, onDelete, ...props }) => {
  return (
    <TagView {...props}>
      <TagLabelView>{label}</TagLabelView>
      <TagCloseIconView onClick={onDelete} />
    </TagView>
  )
}

export default ScTag
