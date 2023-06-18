import React from 'react'
import { SnowIconButton, SnowTooltip } from '../../../adapter'
import styled from 'styled-components'

const IconButtonView = styled(SnowIconButton)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  svg {
    max-width: 24px;
  }
  &.MuiIconButton-root {
    ${({ ispadding }) => (ispadding ? 'padding: 0' : 'padding: 12px')};
  }
  ${({ iconcolor }) =>
    iconcolor
      ? `
        .MuiSvgIcon-root{
          fill: ${iconcolor};
        }
      `
      : ''}
  ${({ buttonsize }) =>
    buttonsize
      ? `
        &.MuiIconButton-root{
          height: ${buttonsize}px;
          width: ${buttonsize}px;
          box-sizing: border-box;
        }
      `
      : ''}
`

export const ScIconButton = React.forwardRef(function ScIconButton(
  {
    onClick = (evt) => console.log('SnowIconButton', evt),
    children = {},
    tooltip = '',
    color = 'grey',
    noPadding,
    PopperProps,
    tooltipPlacement,
    size,
    ...props
  },
  ref
) {
  const handleClick = (evt) => {
    evt.preventDefault()
    onClick(evt)
  }
  return (
    <IconButtonView
      ref={ref}
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
      iconcolor={color}
      buttonsize={size}
      ispadding={noPadding ? 1 : 0}
      {...props}
    >
      {tooltip ? (
        <SnowTooltip
          title={tooltip}
          PopperProps={PopperProps}
          placement={tooltipPlacement ? tooltipPlacement : 'bottom'}
        >
          <div style={{ display: 'flex' }}>{children}</div>
        </SnowTooltip>
      ) : (
        <div style={{ display: 'flex' }}>{children}</div>
      )}
    </IconButtonView>
  )
})

export default ScIconButton
