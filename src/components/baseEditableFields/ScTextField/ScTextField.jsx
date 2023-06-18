import React, { useEffect, useRef, useState } from 'react'
import {ScBaseTextField} from './ScBaseTextField'
import PropTypes from 'prop-types'

/**
 *
 * @param onUpdate - callback function {key,value}
 * @param mb - margin-bottom, in 'px', number
 * @param inputWidth - max-width for text field, in '%', number
 * @param labelPlacement - where label render, can be 'top', 'start', 'end'
 * @param onClick
 * @param value
 * @param code
 * @param label
 * @param required
 * @param meta
 * @param isInvalid
 * @param updateDelay
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

export const ScTextField = ({
  onUpdate = () => {},
  onClick,
  value = '',
  code = '',
  type = 'text',
  updateDelay = 500,
  isGroupField = false,
  isInvalid = false,
  label = '',
  labelPlacement = 'top',
  inputWidth = 100,
  inputProps = {},
  labelFontProps = { fontWeight: '', fontSize: '' },
  fieldFontProps = { fontWeight: '', fontSize: '' },
  mb = 0,
  placeholder = '',
  tooltipText = '',
  helperText = '',
  variant = 'outlined',
  ...props
}) => {
  const [poolValue, setPoolValue] = useState(value)
  const timeOutId = useRef(null)

  const handleChange = (evt) => {
    const typedTxt = evt?.target?.value
    setPoolValue(typedTxt)

    const updateValue = () => {
      onUpdate({ value: typedTxt, key: code })
    }
    timeOutId.current && clearTimeout(timeOutId.current)
    timeOutId.current = updateDelay
      ? setTimeout(() => updateValue(), updateDelay)
      : updateValue()
  }

  useEffect(() => {
    setPoolValue(value)
  }, [value])

  useEffect(() => {
    return () => timeOutId.current && clearTimeout(timeOutId.current)
  }, [])

  return (
    <ScBaseTextField
      inputProps={{
        ...inputProps,
        'aria-label': props.multiline ? 'textarea' : 'text',
        value: poolValue,
        type: type,
        id: `${code}`,
        onChange: handleChange,
        onClick: onClick,
        disabled: props.disabled,
        required: props.required,
        multiline: props.multiline,
        rows: props.rows,
        error: isInvalid,
        placeholder: placeholder,
        ...fieldFontProps,
        'data-testid': 'text-input'
      }}
      rest={{
        name: label ? label : 'text-field',
        variant,
        isGroupField,
        label,
        labelPlacement,
        helperText,
        isInvalid,
        inputWidth,
        tooltipText,
        code,
        mb,
        fieldFontProps,
        labelFontProps,
        ...props
      }}
    />
  )
}

export default ScTextField

ScTextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  tooltipText: PropTypes.string,
  code: PropTypes.string,

  updateDelay: PropTypes.number,
  mb: PropTypes.number,

  isGroupField: PropTypes.bool,
  isInvalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,

  type: PropTypes.oneOf(['text', 'password']),
  labelPlacement: PropTypes.oneOf(['top', 'top-big', 'start', 'end', '']),
  variant: PropTypes.oneOf(['outlined', 'standard']),

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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
