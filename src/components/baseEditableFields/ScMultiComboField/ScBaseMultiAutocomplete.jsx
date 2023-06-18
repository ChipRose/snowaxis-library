import React, { useEffect, useState } from 'react'
import { SnowArrowDropDownIcon, SnowArrowDropUpIcon } from '../../../adapter'
import { ScIconButton } from '../../buttons'
import { ScFieldLabel } from '../../layout'
import ScComboListbox from './ScComboListbox'
import ScTag from './ScTag'
import useAutocomplete from '@mui/material/useAutocomplete'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import { transformOptions } from '../../../util/components/transformOptions'
import styled from 'styled-components'

const InputWrapper = styled('div')`
  display: flex;
  min-width: 100%;
  flex: 1 1 100%;
  align-items: center;
  flex-wrap: wrap;
  transition: boxShadow 0.3s ease-in;
  li.${autocompleteClasses.focused} {
    box-shadow: 0 -2px 0 ${({ theme }) => theme.mainPalette.grey.dark} inset;
    box-sizing: border-box;
  }
  &:hover {
    border-color: ${({ theme }) => theme.mainPalette.grey.dark};
  }

  input {
    min-width: 10%;
    max-width: 100%;
    flex: 1 1 20%;
    font-size: 14px;
    min-height: 40px;
    box-sizing: border-box;
    padding: 9px 10px;
    border: none;
    margin: 0;
    outline: none;
    background: transparent;
    ${({ theme, fontSize, fontWeight }) => `
      font-size: ${fontSize ? fontSize : theme.fontSize.main};
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
    `}
    ::placeholder {
      opacity: 1;
      font-size: inherit;
      font-weight: inherit;
    }
  }
`

const getTagNameByValue = (value, valueName, tag, options) => {
  return (
    (Boolean(options?.length) &&
      Boolean(value) &&
      options?.filter(
        (option) => String(option[valueName]) === String(value)
      )?.[0]?.[tag]) ??
    options?.filter((option) => String(option.value) === String(value))?.[0]
      ?.label ??
    value
  )
}

const getValidOptions = (options) => {
  return options?.length > 0
    ? options?.filter(
        (option) => option.value !== null && option.value !== 'undefined'
      )
    : []
}

const getInitValue = (incomeValue, emptyOption, optionsDef) => {
  if (Array.isArray(incomeValue) && incomeValue?.length) return incomeValue
  const emptyState = getEmptyOptionValue(optionsDef, emptyOption)
    ? [getEmptyOptionValue(optionsDef, emptyOption)]
    : []
  if (emptyState?.length) return emptyState
  return []
}

const getEmptyOptionValue = (_optionsDef, emptyOption) => {
  if (emptyOption === 'undefined') return
  if (_optionsDef?.value) {
    return emptyOption[_optionsDef?.value]
  } else {
    if (typeof emptyOption === 'string' || typeof emptyOption === 'number')
      return emptyOption
    if (typeof emptyOption === 'object') return Object.values(emptyOption)[0]
  }
}

export const ScBaseMultiAutocomplete = ({
  labelProps={},
  value: incomeValue = [],
  optionsDef = {},
  metaOptions = {},
  emptyOption = {},
  code = '',
  multiple = true,
  onButtonClick = () => {},
  isInvalid = false,
  focused: incomeFocused = false,
  required = false,
  InputProps = {},
  fieldFontProps = { fontSize: '', fontWeight: '' },
  onUpdate = () => {},
  ...props
}) => {
  const _optionsDef = optionsDef
  const initValue = getInitValue(incomeValue, emptyOption, _optionsDef)
  const [val, setVal] = useState(initValue)
  const [hasChanges, setHasChanges] = useState(false)
  const [del, setDel] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const emptyOptionValue = getEmptyOptionValue(_optionsDef, emptyOption)
  const options = transformOptions({
    options: metaOptions,
    optionsDef: _optionsDef
  })

  const handleUpdate = ({ value: updatedValue, ...props }) => {
    const allowedValue =
      Array.isArray(updatedValue) &&
      options
        .map(({ value }) => value)
        .filter((optionVal) => updatedValue.includes(optionVal))
    onUpdate({ value: allowedValue, ...props })
  }
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl
  } = useAutocomplete({
    id: code,
    disabled: props.disabled,
    disableCloseOnSelect: true,
    multiple: multiple,
    autoComplete: true,
    value: val,
    options: getValidOptions(options),
    open: showPopup,
    onChange: (_, _val, reason, details) =>
      handleChange(_, _val, reason, details),
    onInputChange: () => handleInputChange(),
    isOptionEqualToValue: (option, value) => {
      return option?.value === value || option?.value === value?.value
    },
    getOptionLabel: (option) => option.label
  })

  const handleChange = (evt, _val, reason, details) => {
    setHasChanges(true)
    if (reason === 'selectOption') {
      let rezult = []
      if (emptyOptionValue) {
        if (details.option.value === emptyOptionValue) {
          rezult = [emptyOptionValue]
          handleUpdate({
            value: [],
            reason: 'SnowAutoComplete handleChange handleUpdate empty'
          })
        } else {
          rezult = val?.length
            ? [
                ...val?.filter((value) => value !== emptyOptionValue),
                details.option.value
              ]
            : [...val, details.option.value]
        }
      } else {
        rezult = [...val, details.option.value]
      }
      setVal(rezult)
    }
    if (reason === 'removeOption') {
      if (emptyOptionValue) {
        if (_val?.length) {
          setDel(false)
          setVal(_val)
        } else {
          setVal([emptyOptionValue])
          setDel(true)
        }
      } else {
        setVal(_val)
        _val.length === 0 &&
          handleUpdate({
            value: [],
            reason: {
              message: 'SnowAutocomplete handleUpdate  remove option',
              data: {
                details,
                _val
              }
            }
          })
      }
    }
  }
  const handleInputChange = () => {
    setShowPopup(true)
  }

  const handleShowPopup = () => {
    setShowPopup(!showPopup)
  }

  useEffect(() => {
    !focused && setShowPopup(false)
  }, [focused])

  useEffect(() => {
    del &&
      handleUpdate({
        value: [],
        reason: { message: 'SnowAutocomplete useEffect handleUpdate del', del }
      })
  }, [del])

  useEffect(() => {
    const needsToUpdate =
      val?.length && !val.includes(emptyOptionValue) && hasChanges

    needsToUpdate &&
      handleUpdate({
        value: val,
        reason: 'SnowAutoComplete useEffect handleUpdate val updated'
      })
  }, [val])

  useEffect(() => {
    Array.isArray(incomeValue) && incomeValue?.length && setVal(incomeValue)
  }, [incomeValue?.length])

  return (
    <ScFieldLabel
      {...labelProps}
      {...getInputLabelProps()}
      {...props}
    >
      <div style={{ width: '100%' }} aria-label="multi-combofield">
        <div style={{ display: 'flex' }}>
          <div {...getRootProps()} style={{ flex: '1 1 auto' }}>
            <InputWrapper
              ref={setAnchorEl}
              focused={focused}
              {...fieldFontProps}
            >
              {val?.length
                ? val.map((_val, index) => (
                    <ScTag
                      key={index}
                      label={getTagNameByValue(
                        _val,
                        _optionsDef.value,
                        _optionsDef.tag,
                        options
                      )}
                      {...getTagProps({ index })}
                    />
                  ))
                : null}
              <input
                onClick={handleShowPopup}
                {...props}
                {...InputProps}
                {...getInputProps()}
              />
            </InputWrapper>
          </div>
          <ScIconButton size={40} onClick={handleShowPopup}>
            {showPopup ? <SnowArrowDropUpIcon /> : <SnowArrowDropDownIcon />}
          </ScIconButton>
        </div>
        <ScComboListbox
          options={groupedOptions}
          listProps={getListboxProps}
          itemProps={getOptionProps}
        />
      </div>
    </ScFieldLabel>
  )
}
export default ScBaseMultiAutocomplete
