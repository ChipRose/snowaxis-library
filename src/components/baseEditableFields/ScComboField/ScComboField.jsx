import React, { useRef, useContext } from 'react'
import { SnowAutocomplete, SnowTextField } from '../../../adapter'
import { SnowCancelIcon } from '../../../adapter/icons'
import { ScFieldLabel } from '../../layout'
import { transformOptions } from '../../../util/components/transformOptions'
import PropTypes from 'prop-types'
import styled, { ThemeContext } from 'styled-components'

const AutocompleteView = styled.div`
  width: 100%;
  .MuiAutocomplete-popper {
    margin: 0;
    padding: 0;
  }
  ul {
    position: absolute;
  }
`

const CombofieldInputView = styled(SnowTextField)`
  width: 100%;
  fieldset {
    display: none;
  }
  .MuiInputBase-root {
    ${({ theme, fontSize, fontWeight }) => `
      font-size: ${fontSize ? fontSize : theme.fontSize.main};
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
    `}
    padding: 0 !important;
    height: 100%;
    :hover {
      .MuiInputBase-root-MuiInput-root::after {
        border-botom: none !important;
      }
    }
  }
  .MuiInput-root .MuiInput-input,
  .MuiOutlinedInput-input {
    padding: 8px ${({ isbuttonexist }) => (isbuttonexist ? '30px' : '10px')} 8px
      10px !important;
    box-sizing: border-box;
    min-height: 40px;
    border-bottom: ${({ border }) => border};
  }
  .MuiAutocomplete-endAdornment {
    right: 2px !important;
  }
`

const isSimpleType = (value) => ['string', 'number'].includes(typeof value)

export const ScComboField = ({
  onUpdate = () => {},
  value: _value = '',
  code = '',
  updateDelay = 500,
  isGroupField = false,
  isInvalid = false,
  freeSolo = true, //freeSolo property of Autocomplete in material ui
  tooltipNewValue = true,
  disableIndicatorNewValue = false,
  disableClearable = true,
  label = '',
  labelPlacement = 'top',
  inputWidth = 100,
  helperText = '',
  fieldFontProps = { fontSize: '', fontWeight: '' },
  labelFontProps = { fontSize: '', fontWeight: '' },
  variant = 'outlined',
  mb = 0,
  clearIcon = (
    <SnowCancelIcon size={'small'} style={{ width: '18px', height: '18px' }} />
  ),
  onClear = () => {},
  meta = { options: {}, optionsDef: {} },
  ...props
}) => {
  const theme = useContext(ThemeContext)
  const value = String(_value)
  const comboValue = useRef({ value: '', label: '' })
  const inputValue = useRef('')

  const castedAutoOptions = transformOptions(meta)

  const getIsNewValue = (val) =>
    Boolean(
      (val || props.required) &&
        !castedAutoOptions.find(
          ({ value: optionVal }) => String(optionVal) === String(val)
        )
    )

  const getOptionValueByLabel = (comboText) => {
    return (
      castedAutoOptions.find(
        ({ value, label }) => String(comboText) === String(label)
      )?.value ?? comboText
    )
  }

  const getOptionLabelByValue = (comboValue) => {
    return (
      castedAutoOptions.find(
        ({ value, label }) => String(value) === String(comboValue)
      )?.label ?? comboValue
    )
  }

  const handleClose = () => {
    const comboVal = getOptionValueByLabel(comboValue?.current?.label) || ''
    const inputVal = inputValue.current

    const isValid = freeSolo || !getIsNewValue(inputVal || comboVal)

    if (value === (inputVal || comboVal)) return

    if (!freeSolo && getIsNewValue(inputVal || comboVal)) return
    onUpdate({
      value: inputVal || comboVal || '',
      code,
      isValid,
      label: comboValue?.current?.label || ''
    })
  }

  const getBorderStyle = (value) => {
    const isNew = getIsNewValue(value)
    if (disableIndicatorNewValue) return 'none'
    if (props.required) return isNew ? '2px solid orange' : 'none'
    return isNew && value !== '' ? '2px solid orange' : 'none'
  }

  const getTooltip = (isNewValue) => {
    const tooltipForNewValue = tooltipNewValue
      ? "Value doesn't match to existing values."
      : ''
    return isNewValue
      ? tooltipForNewValue
      : props?.tooltip || meta?.tooltip || 'Type or choose option'
  }

  const getListboxStyle = ({ theme }) => {
    return {
      fontWeight: theme.fontWeight.thin,
      color: theme.mainPalette.typography.main,
      background: theme.mainPalette.color.contrast,
      border: theme.border.secondary,
      borderRadius: theme.borderRadius.main,
      overflowY: 'scroll',
      boxShadow: theme.shadow.main
    }
  }

  return (
    <ScFieldLabel
      label={label}
      isGroupField={isGroupField}
      inputWidth={inputWidth}
      labelPlacement={labelPlacement}
      isInvalid={isInvalid}
      variant={variant}
      fieldFontProps={fieldFontProps}
      labelFontProps={labelFontProps}
      code={code}
      helperText={helperText}
      required={props.required}
      tooltipText={
        getTooltip(getIsNewValue(value)) ? getTooltip(getIsNewValue(value)) : ''
      }
    >
      <AutocompleteView>
        <SnowAutocomplete
          disablePortal={false}
          freeSolo={freeSolo}
          id={code}
          options={castedAutoOptions}
          autoComplete={true}
          disabled={props.disabled}
          disableClearable={disableClearable}
          placeholder={props.placeholder}
          ListboxComponent={'ul'}
          multiple={false}
          ListboxProps={{
            style: getListboxStyle({ theme })
          }}
          clearIcon={clearIcon}
          getOptionLabel={(option) => {
            return isSimpleType(option)
              ? String(option)
              : String(option.label ?? '')
          }}
          isOptionEqualToValue={(option, _value) => {
            if (typeof _value === 'undefined') return null
            if (isSimpleType(_value)) return option?.label === _value
            return option?.label === _value?.label
          }}
          selectOnFocus
          clearOnBlur={false}
          handleHomeEndKeys
          value={getOptionLabelByValue(value) || ''}
          onChange={(evt, selectedOption, reason) => {
            comboValue.current = isSimpleType(selectedOption)
              ? { label: selectedOption, id: selectedOption }
              : selectedOption
            if (reason === 'clear') {
              onClear()
            }
            inputValue.current = ''
          }}
          onInputChange={(evt, textVal, reason) => {
            // if(reason==='reset') {onClear()}
            comboValue.current = {
              value: getOptionValueByLabel(textVal),
              label: textVal
            }
          }}
          onClose={handleClose}
          renderInput={(params) => {
            return (
              <CombofieldInputView
                {...params}
                mb={mb}
                border={getBorderStyle(value)}
                variant={variant}
                id={code}
                error={isInvalid}
                isbuttonexist={disableClearable ? 0 : 1}
                data-testid="combobox-text"
                value={comboValue.current?.label}
                InputProps={{
                  ...params.InputProps,
                  type: 'search'
                }}
                disabled={props.disabled}
                placeholder={props.placeholder}
                onChange={(evt) => {
                  const { value } = evt.target
                  inputValue.current = value
                }}
                {...fieldFontProps}
              />
            )
          }}
        />
      </AutocompleteView>
    </ScFieldLabel>
  )
}

export default ScComboField

ScComboField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  code: PropTypes.string,

  updateDelay: PropTypes.number,
  mb: PropTypes.number,

  isGroupField: PropTypes.bool,
  isInvalid: PropTypes.bool,
  freeSolo: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltipNewValue: PropTypes.bool,
  disableIndicatorNewValue: PropTypes.bool,
  disableClearable: PropTypes.bool,

  clearIcon: PropTypes.node,

  labelPlacement: PropTypes.oneOf(['top', 'top-big', 'start', 'end', '']),
  variant: PropTypes.oneOf(['outlined', 'standard']),

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  meta: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ),
    optionsDef: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  }),

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
