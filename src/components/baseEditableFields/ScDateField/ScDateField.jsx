import React, { useEffect, useRef, useState } from 'react'
import { format, formatISO, parseISO } from 'date-fns'
import { SnowDatePicker } from '../../../adapter'
import { ScFieldLabel } from '../../layout'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/**
 *
 * @param onUpdate - callback function {key,value}
 * @param mb - margin-bottom, in 'px', number
 * @param inputWidth - max-width for text field, in '%', number
 * @param labelPlacement - where label render, can be  'start', 'end'
 * @param value
 * @param code - id for label and input connection
 * @param label
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const DateFieldBoxView = styled.div`
  width: 100%;
  .react-datepicker-wrapper {
    display: block;
  }
  .react-datepicker__input-container {
    display: block;
    input {
      width: 100%;
      padding: 9px 10px;
      min-height: 40px;
      box-sizing: border-box;
      outline: none;
      border: none;
      text-align: left;
      ${({ theme, fontSize, fontWeight }) => `
        color: ${theme.mainPalette.grey[200]} !important;
        font-size: ${fontSize ? fontSize : theme.fontSize.main};
        font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
      `}
    }
  }
  .react-datepicker__current-month {
    ${({ theme }) => `
        font-size: ${theme.fontSize.main};
        font-weight: ${theme.fontWeight.main};
      `}
  }
`

export const scDateFormat = (date, dateFormat = 'yyyy-MM-dd') => {
  return format(date, dateFormat)
}
export const scDateIsoFormat = (date) => {
  return formatISO(date, { representation: 'date' })
}

export const ScDateField = ({
  onUpdate = () => {},
  onClick = () => {},
  value = '',
  code = '',
  label = '',
  helperText = '',
  tooltipText = '',
  popperClassName = '',
  popperPlacement = 'bottom',
  labelPlacement = 'top',
  dateFormat = 'yyyy-MM-dd',
  placeholder = '(Not set)',
  updateDelay = 500,
  variant = 'outlined',
  inputWidth = 100,
  fieldFontProps = { fontSize: '', fontWeight: '' },
  labelFontProps = { fontSize: '', fontWeight: '' },
  mb = 0,
  isGroupField = false,
  isInvalid = false,
  isClearable = false,
  inline = false,
  meta = {},
  ...props
}) => {
  const labelProps = {
    label,
    labelPlacement,
    isGroupField,
    inputWidth,
    isInvalid,
    code,
    required: props.required,
    variant,
    helperText,
    tooltipText,
    fieldFontProps,
    labelFontProps,
    mb
  }

  const [dateValue, setDateValue] = useState(value ? parseISO(value) : null)
  const timeOutId = useRef(null)

  const handleChange = (date) => {
    const formatedDate = date && scDateIsoFormat(date)
    const previousDate = dateValue && scDateIsoFormat(dateValue)
    const datesAreDifferent = formatedDate !== previousDate

    datesAreDifferent && setDateValue(date)
    if (!onUpdate) return
    const updateValue = () => {
      onUpdate({ value: formatedDate, key: code })
    }

    timeOutId.current && clearTimeout(timeOutId.current)
    timeOutId.current = updateDelay
      ? setTimeout(() => updateValue(), updateDelay)
      : updateValue()
  }
  useEffect(() => {
    setDateValue(value ? new parseISO(value) : null)
  }, [value])
  const dateToOpen = dateValue ?? new Date()

  return (
    <ScFieldLabel {...labelProps}>
      <DateFieldBoxView {...fieldFontProps}>
        <SnowDatePicker
          id={code}
          autoComplete={'off'}
          selected={dateValue}
          onChange={handleChange}
          dateFormat={dateFormat}
          ariaInvalid={isInvalid}
          ariaRequired={props.required}
          disabled={props.disabled}
          popperPlacement={popperPlacement}
          popperClassName={popperClassName}
          isClearable={isClearable}
          openToDate={dateToOpen}
          value={value}
          inline={inline}
          placeholderText={placeholder}
        />
      </DateFieldBoxView>
    </ScFieldLabel>
  )
}

export default ScDateField

ScDateField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  dateFormat: PropTypes.string,
  placeholder: PropTypes.string,
  code: PropTypes.string,
  helperText: PropTypes.string,
  tooltipText: PropTypes.string,

  updateDelay: PropTypes.number,
  mb: PropTypes.number,

  isGroupField: PropTypes.bool,
  isInvalid: PropTypes.bool,
  required: PropTypes.bool,
  isClearable: PropTypes.bool,
  disabled: PropTypes.bool,

  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  labelPlacement: PropTypes.oneOf(['top', 'top-big', 'start', 'end', '']),
  popperPlacement: PropTypes.oneOf(['top', 'start', 'end']),
  variant: PropTypes.oneOf(['outlined', 'standard']),

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
