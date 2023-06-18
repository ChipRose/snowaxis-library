import React, { useState, useEffect } from 'react'
import { format, formatISO, isDate } from 'date-fns'
import { SnowDatePicker, SnowClickAwayListener } from '../../../adapter'
import { SnowArrowForwardIcon } from '../../../adapter'
import { ScFieldLabel } from '../../layout'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const DatePickerBoxView = styled.div`
  position: absolute;
  z-index: 1000;

  .react-datepicker__day {
    width: 1.6rem;
    line-height: 1.6rem;
  }
  .react-datepicker__day--keyboard-selected:not(.react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range) {
    background: inherit;
    color: inherit;
    text-decoration: inherit;
  }
`

const DateRangeView = styled.div`
  padding: 6px 3px;
  min-height: 40px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
  align-items: center;
  justify-content: space-between;
  ${({ theme, fontSize, fontWeight }) => `
    font-size: ${fontSize ? fontSize : theme.fontSize.main};
    font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
  `}
  text-align: center;
`

const DateRangeFieldView = css`
  min-height: 25px;
  outline: none;
  border: none;
  text-align: center;
  background: transparent;
  input::placeholder {
    opacity: 1;
    ${({ theme }) => `
      color: ${theme.mainPalette.typography.light};
      font-size: inherit;
      font-weight: inherit;
  `}
  }
  border-bottom: ${({ theme, editState }) =>
    editState
      ? 'none'
      : `1px solid ${theme.mainPalette.grey[100]};
  `};
`

const DateRangeStartView = styled.input`
  ${DateRangeFieldView}
  grid-column: 1/2;
`

const DateRangeEndView = styled.input`
  ${DateRangeFieldView}
  grid-column: 3/4;
`

const DateRangeArrowView = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 15px;
  }
`

//todo would be good to specify different standards for date formats in different contexts
const getFormattedDate = (date, dateFormat = 'P') => {
  const defaultDate = ''
  try {
    return date && isDate(new Date(date))
      ? format(date, dateFormat)
      : defaultDate
  } catch (e) {
    console.log(
      'getFormattedDate exception e',
      date,
      isDate(date),
      typeof date,
      e?.message
    )
  }
  return defaultDate
}

export const ScDateRangeField = ({
  code,
  label = '',
  labelPlacement = 'top',
  placeholder = '',
  tooltipText = '',
  helperText = '',
  inputWidth = 100,
  isInvalid = false,
  value = { start: '', end: '' },
  isGroupField = false,
  fieldFontProps = { fontSize: '', fontWeight: '' },
  labelFontProps = { fontSize: '', fontWeight: '' },
  edit = false,
  mb=0,
  variant='outlined',
  onUpdate=()=>{},
  ...props
}) => {
  const labelProps = {
    label,
    labelPlacement,
    inputWidth,
    helperText,
    tooltipText,
    isGroupField,
    isInvalid,
    mb,
    required: props.required,
    disabled: props.disabled,
    fieldFontProps,
    labelFontProps
  }
  const inputProps = {
    disabled: props.disabled,
    required: props.required,
    placeholder,
    'aria-invalid': isInvalid
  }
  const [isEdit, setIsEdit] = useState(false)
  const { start, end } = value
  const [startDate, setStartDate] = useState(start ? new Date(start) : null)

  //trick to handle react-data-picker bugs: not working events
  const [checkRange, setCheckRange] = useState(false)
  const [endDate, setEndDate] = useState(end ? new Date(end) : null)

  const handleCalendarClose = () => console.log('ScDateRange Calendar closed')
  const handleCalendarOpen = () => console.log('ScDateRange Calendar opened')

  useEffect(() => {
    const { start, end } = value

    start
      ? setStartDate(isDate(start) ? start : new Date(start))
      : setStartDate(null)
    end ? setEndDate(isDate(end) ? end : new Date(end)) : setEndDate(null)
  }, [value])

  useEffect(() => {
    if (!checkRange) return
    ;(startDate || endDate) &&
      onUpdate({
        code,
        value: { start: formatISO(startDate), end: formatISO(endDate) }
      })
    setCheckRange(false)
    setIsEdit(false)
  }, [checkRange])

  const handleDateUpdate = (dates) => {
    if (typeof dates === 'undefined') return

    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    start && end && setCheckRange(true)
  }

  return (
    <>
      {isEdit && !props.disabled ? (
        <SnowClickAwayListener
          onClickAway={(evt) => {
            setCheckRange(true)
          }}
        >
          <DatePickerBoxView>
            <SnowDatePicker
              selected={startDate}
              onCalendarOpen={handleCalendarOpen}
              onCalendarClose={handleCalendarClose}
              onChange={handleDateUpdate}
              startDate={startDate}
              endDate={endDate}
              monthsShown={2}
              selectsRange={true}
              inline
              isClearable={true}
              portalId="root-portal"
              withPortal
              shouldCloseOnSelect={false}
            />
          </DatePickerBoxView>
        </SnowClickAwayListener>
      ) : (
        <ScFieldLabel {...labelProps}>
          <DateRangeView onClick={() => setIsEdit(true)} {...fieldFontProps}>
            <DateRangeStartView
              editState={value?.start ? 1 : 0}
              value={getFormattedDate(startDate)}
              {...inputProps}
            />
            <DateRangeArrowView>
              <SnowArrowForwardIcon
                fontSize={'small'}
                style={{ color: 'lightgray' }}
              />
            </DateRangeArrowView>
            <DateRangeEndView
              editState={value?.end ? 1 : 0}
              value={getFormattedDate(endDate)}
              {...inputProps}
            />
          </DateRangeView>
        </ScFieldLabel>
      )}
    </>
  )
}

export default ScDateRangeField

ScDateRangeField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  code: PropTypes.string,
  helperText: PropTypes.string,

  updateDelay: PropTypes.number,
  mb: PropTypes.number,

  isGroupField: PropTypes.bool,
  isInvalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,

  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  labelPlacement: PropTypes.oneOf(['top', 'top-big', 'start', 'end', '']),
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
