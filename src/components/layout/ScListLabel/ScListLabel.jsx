import React from 'react'
import { SnowTypography } from '../../../adapter'
import styled, { css } from 'styled-components'

const ListStartEndBasicBoxView = css`
  ${({ justifyContent }) => `
    display: flex;
    justify-content: ${justifyContent};
  `}
`

const ListTopBasicBoxView = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ListLabelBoxView = styled.div`
  display: flex;
  ${({ istop }) => (istop ? ListTopBasicBoxView : ListStartEndBasicBoxView)}
`

// const StyledFieldStartEndWrapper = css`
//   display: flex;
//   justify-content: ${({ isstart }) => (isstart ? 'flex-start' : 'flex-end')};
// `

const ListStartEndLabelBasicView = css`
  padding-top: 12px;
  margin-bottom: auto;
  flex: 0 0 auto;
  max-width: 50%;

  ${({ isstart, theme }) =>
    isstart
      ? `
    order: 0;
    margin-right: ${theme.indent.secondary};
  `
      : `
    order: 1;
    margin-left:${theme.indent.secondary};
  `}
`

const ListTopLabelBasicView = css`
  max-width: auto;
  ${({ istopbig }) =>
    istopbig
      ? ''
      : `
    transform: scale(0.75);
  `}
  transform-origin: left;
`

const ListLabelView = styled.label`
  margin-bottom: 0;
  cursor: pointer;
  max-width: 50%;
  .MuiTypography-root {
    ${({ theme, fontSize, fontWeight }) => `
      color: ${theme.mainPalette.typography.main};
      font-size: ${fontSize ? fontSize : theme.fontSize.main};
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
    `}
  }
  ${({ istop }) => (istop ? ListTopLabelBasicView : ListStartEndLabelBasicView)}
`

const ListFieldsBoxView = styled.div`
  width: ${({ width }) => width};
  min-width: 600px;
`
export const ScListLabel = ({
  label = '',
  labelPlacement = 'top',
  isGroupField = false,
  inputWidth = 100,
  minWidth = 'auto',
  children = {},
  code = '',
  labelFontProps = { fontWeight: '', fontSize: '' },
  ...props
}) => {
  const isTopLabelPlacement = label && labelPlacement === 'top' ? 1 : 0
  const isStartLabelPlacement = label && labelPlacement === 'start' ? 1 : 0
  const isLabelExist = label ? true : false

  const _inputWidth = typeof inputWidth === 'string' ? 'auto' : `${inputWidth}%`

  const child = {
    ...children,
    props: {
      ...children.props
    }
  }

  return isLabelExist ? (
    <ListLabelBoxView
      istop={isTopLabelPlacement}
      justifyContent={isGroupField ? 'space-between' : 'flex-start'}
      width={_inputWidth}
      aria-label="list-label-box"
    >
      <ListLabelView
        istop={isTopLabelPlacement}
        istopbig={labelPlacement === 'top-big' ? 1 : 0}
        isstart={isStartLabelPlacement}
        htmlFor={`${code}-0`}
        aria-label="list-label"
        {...labelFontProps}
      >
        <SnowTypography>{label}</SnowTypography>
      </ListLabelView>
      <ListFieldsBoxView
        isstart={isStartLabelPlacement}
        width={_inputWidth}
        istop={isTopLabelPlacement}
        aria-label="fields-wrapper"
        minWidth={minWidth}
      >
        {child}
      </ListFieldsBoxView>
    </ListLabelBoxView>
  ) : (
    <>{child}</>
  )
}
export default ScListLabel
