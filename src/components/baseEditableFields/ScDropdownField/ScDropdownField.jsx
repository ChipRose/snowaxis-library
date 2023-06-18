import React from 'react'
import { SnowSelect, SnowMenuItem } from '../../../adapter'
import { ScFieldLabel } from '../../layout'
import { transformOptions } from '../../../util/components/transformOptions'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SelectFieldView = styled(SnowSelect)`
  .MuiSelect-root {
    border: none;
  }
  width: 100%;
  div {
    margin-top: 0;
  }
  fieldset {
    top: 0;
    display: none;
  }
  legend {
    display: none;
  }
  .MuiSelect-nativeInput {
    padding: 7px 10px;
    min-height: 40px;
    box-sizing: border-box;
  }
  label {
    display: none;
  }
  .MuiSelect-select {
    padding: 8px 10px;
    ${({ theme, fontSize, fontWeight }) => `
      font-size: ${fontSize ? fontSize : theme.fontSize.main};
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
      line-height: ${theme.lineHeight.main};
    `}
    min-height: auto !important;
    vertical-align: middle;
  }
  ${({ buttonPlacement }) => `
    svg {
      top: ${buttonPlacement};
      transform: translateY(-50%);
    }
  `}
`

const SelectItemView = styled(SnowMenuItem)`
  &.MuiMenuItem-root {
    ${({ theme }) => `
      color: ${theme.mainPalette.typography.main};
      font-weight: ${theme.fontWeight.thin};
    `}
    &[aria-selected='true'] {
      background: ${({ theme }) => theme.mainPalette.grey.light} !important;
    }
  }
`

export const ScDropdownField = ({
  label = '',
  labelPlacement = 'top',
  mb = 0,
  code = '',
  value = '',
  isInvalid = false,
  isGroupField = false,
  variant = 'outlined',
  inputWidth = 100,
  meta = {},
  updateDelay = 500,
  helperText = '',
  tooltipText = '',
  fieldFontProps = { fontSize: '', fontWeight: '' },
  labelFontProps = { fontSize: '', fontWeight: '' },
  onUpdate,
  ...props
}) => {
  //dropdown options can be tree types:
  // 1 - string list ['first','second',...etc] where item is value and label both
  // 2 - value-as-key objects list [{23:'Label1'},{'ZZ':'Label 2'},...etc]
  // 3 - formalized objects list [{"valueKey":value,"labelKey":label},...,{"valueKey":valueX,"labelKey":labelX}]

  const labelProps = {
    label,
    labelPlacement,
    isGroupField,
    inputWidth,
    variant,
    isInvalid,
    required: props.required,
    helperText,
    fieldFontProps,
    labelFontProps,
    code,
    tooltipText,
    mb
  }
  const normalisedOptions = transformOptions(meta)
  const hasEmptyOption = normalisedOptions.find(({ value }) => value === '')

  return (
    <ScFieldLabel {...labelProps}>
      <SelectFieldView
        size={'small'}
        {...fieldFontProps}
        buttonPlacement={labelPlacement === 'top' ? '15px' : '50%'}
        autoWidth={true}
        inputProps={{
          name: label,
          id: code,
          'aria-invalid': isInvalid,
          'data-testid': 'select',
          'aria-required': props.required
        }}
        disabled={props.disabled}
        required={props.required}
        error={isInvalid}
        displayEmpty
        MenuProps={{
          anchorReference: 'anchorEl',
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          transformOrigin: { vertical: 'top', horizontal: 'left' }
        }}
        value={value || ''}
        onChange={(evt) => {
          onUpdate({ value: evt.target.value })
        }}
      >
        {!hasEmptyOption && (
          <SelectItemView value="">Not selected</SelectItemView>
        )}
        {normalisedOptions.map((item, index) => {
          const { value, label } = item
          return (
            <SelectItemView key={index} value={value}>
              {label}
            </SelectItemView>
          )
        })}
      </SelectFieldView>
    </ScFieldLabel>
  )
}

export default ScDropdownField

ScDropdownField.propTypes = {
  label: PropTypes.string,
  code: PropTypes.string,
  helperText: PropTypes.string,
  tooltipText: PropTypes.string,

  updateDelay: PropTypes.number,
  mb: PropTypes.number,

  isGroupField: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  isInvalid: PropTypes.bool,

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  meta: PropTypes.oneOfType([
    PropTypes.shape({
      options: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object)
      ])
    }),
    PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.object),
      optionsDev: PropTypes.object
    })
  ]),

  labelPlacement: PropTypes.oneOf(['top', 'start', 'end', 'top-big', '']),
  variant: PropTypes.oneOf(['standard', 'outlined']),

  fieldFontProps: PropTypes.shape({
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string
  }),
  labelFontProps: PropTypes.shape({
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string
  }),

  onUpdate: PropTypes.func
}
