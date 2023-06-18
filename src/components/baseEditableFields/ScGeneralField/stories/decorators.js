import React from 'react'
import styled from 'styled-components'

const ListView = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

const ItemView = styled.li`
  padding: 16px;
  border-bottom: 1px dashed ${({theme})=> theme.mainPalette.grey[100]};
  :last-of-type {
    margin-bottom: 0;
  }
`

const FieldsGroup = ({ children }) => {
  const _children = Array.isArray(children) ? children : [children]

  return (
    <ListView>
      {_children?.length
        && _children.map((child, index) => <ItemView key={index}>{child}</ItemView>)}
    </ListView>
  )
}
export default FieldsGroup
