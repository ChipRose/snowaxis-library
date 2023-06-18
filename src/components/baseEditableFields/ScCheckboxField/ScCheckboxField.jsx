import React from 'react'
import { SnowInputLabel, SnowCheckbox } from '../../../adapter'
import { transformToBoolean } from '../../../util'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const CheckboxLabelView = styled(SnowInputLabel)`
  margin-left: ${({ ml }) => (ml ? `${ml}px` : 0)};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : 0)};
  margin-bottom: 0;
  max-width: 50%;
  &.MuiInputLabel-root {
    ${({ theme, fontSize, fontWeight }) => `
      font-size: ${fontSize ? fontSize : theme.fontSize.main};
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
      color: ${theme.mainPalette.typography.main};
    `}
  }
  ${({ isend }) => (isend ? 'order: 1;' : '')}
  ${({ istop, theme }) =>
    istop
      ? css`
          &.MuiInputLabel-root {
            font-size: ${theme.fontSize.soSmall};
          }
        `
      : ``}
`

const CheckboxView = styled(SnowCheckbox)`
  &.MuiButtonBase-root {
    height: 24px;
  }
`

const CheckboxAreaView = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  width: ${({ width, isgroup }) =>
    typeof width === 'string' || !isgroup ? 'auto' : `${width}%`};
  ${({ istop, isgroup }) =>
    istop
      ? css`
          display: inline-flex;
        `
      : `
    flex: ${isgroup ? '1 0 auto' : '0 0 auto'}
  `}
  justify-content: ${({ isstart, istop }) =>
    isstart || istop ? 'flex-start' : 'flex-end'};
  > span {
    padding: 0;
  }
`

const CheckboxFieldView = styled.div.attrs({
  'aria-label': 'checkbox-field'
})`
  ${({ mb, width }) => `
    margin-bottom: ${mb ? `${mb}%` : 0};
    width: ${width}%;
  `}
  ${({ istop, isgroup }) =>
    istop
      ? css`
          display: block;
        `
      : css`
          display: flex;
          justify-content: ${isgroup ? 'space-between' : 'flex-start'};
          align-items: center;
        `}
`

// false: undefined, '', 0, false
// true: any text value, true, !0,
export const ScCheckboxField = ({
  value: incomeValue = false,
  label = '',
  labelPlacement = 'start',
  isGroupField = false,
  inputWidth = 100,
  code = '',
  onUpdate = () => null,
  mb = 0,
  labelFontProps = { fontSize: '', fontWeight: '' },
  ...props
}) => {
  const isTopLabelPlacement = label && labelPlacement === 'top' ? 1 : 0
  const isStartLabelPlacement = label && labelPlacement === 'start' ? 1 : 0
  const isEndLabelPlacement = label && labelPlacement === 'end' ? 1 : 0
  const isLabelExist = label ? true : false

  return (
    <CheckboxFieldView
      istop={isTopLabelPlacement}
      isstart={isStartLabelPlacement}
      isgroup={isGroupField ? 1 : 0}
      mb={mb}
      width={isTopLabelPlacement ? inputWidth : 100}
    >
      {isLabelExist && (
        <CheckboxLabelView
          htmlFor={code ? code : 'checkbox'}
          mr={isStartLabelPlacement ? 20 : 0}
          ml={isStartLabelPlacement || isTopLabelPlacement ? 0 : 20}
          isend={isEndLabelPlacement}
          istop={isTopLabelPlacement}
          {...labelFontProps}
        >
          {`${props.required ? `${label}*` : label}`}
        </CheckboxLabelView>
      )}
      <CheckboxAreaView
        width={inputWidth}
        isstart={isStartLabelPlacement}
        isgroup={isGroupField ? 1 : 0}
        istop={isTopLabelPlacement}
      >
        <CheckboxView
          id={code ? code : 'checkbox'}
          isstart={isStartLabelPlacement}
          checked={transformToBoolean(incomeValue)}
          onChange={(evt) => onUpdate({ value: evt.target.checked })}
          {...props}
        />
      </CheckboxAreaView>
    </CheckboxFieldView>
  )
}

export default ScCheckboxField

ScCheckboxField.propTypes = {
  label: PropTypes.string,
  code: PropTypes.string,
  mb: PropTypes.string,

  value: PropTypes.any,
  inputWidth: PropTypes.any,

  disabled: PropTypes.bool,
  isGroupField: PropTypes.bool,
  isInvalid: PropTypes.bool,
  required: PropTypes.bool,

  labelPlacement: PropTypes.oneOf(['top', 'start', 'end', '']),

  labelFontProps: PropTypes.shape({
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string
  }),

  onUpdate: PropTypes.func
}
