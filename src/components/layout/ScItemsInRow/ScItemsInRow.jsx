import React from 'react'
import styled from 'styled-components'

const LayoutView = styled.ul`
  padding: 0;
  margin: 0;
  min-width: ${({width})=>typeof width==='string'?'auto':`${width}px`};
  display: flex;
  list-style: none;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-wrap: ${({flexWrap})=>flexWrap};
`

const ItemView = styled.li`
  padding: 6px;
  box-sizing: border-box;
  flex: 0 0 ${({ width }) => typeof width==='number'? `${width}%`:'auto'};
`

export const ScItemsInRow = ({
  children,
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  itemWidth = 33,
  width='auto',
  flexWrap='wrap',
  ...rest
}) => {
  const _children = Array.isArray(children) ? children : [children]

  return (
    <LayoutView justifyContent={justifyContent} alignItems={alignItems} width={width} flexWrap={flexWrap} aria-label='items-in-row'>
      {_children.map((ActionElement, index) =>
        ActionElement ? (
          <ItemView key={index} width={itemWidth}>
            {ActionElement}
          </ItemView>
        ) : null
      )}
    </LayoutView>
  )
}

export default ScItemsInRow
