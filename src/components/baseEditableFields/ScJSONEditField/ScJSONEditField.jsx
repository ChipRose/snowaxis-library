import React from 'react'
import { SnowJSONInput } from '../../../adapter'
import { ScFieldLabel } from '../../layout'
import PropTypes from 'prop-types'

const ScJSONEditComponent = ({
  onUpdate = (...up) => {
    console.log('ScJsonEditField update', up)
  },
  onClick = () => {},
  meta,
  value = '{}',
  code = '',
  label = '',
  updateDelay,
  viewOnly = false,
  ...props
}) => {
  const { ...rest } = props
  const placeholder = typeof value === 'string' ? JSON.parse(value) : value
  const isValidPlaceholder = typeof placeholder === 'object'

  return (
    <SnowJSONInput
      id={code}
      placeholder={(isValidPlaceholder && placeholder) || {}}
      onChange={(editObj) => {
        console.log('JSON onChange', editObj)
        onUpdate({ value: editObj.jsObject })
      }}
      viewOnly={viewOnly}
      modifyErrorText={() => 'Incorrect JSON syntax'}
      height="150px"
      width="100%"
      // waitAfterKeyPress='3000'
      {...rest}
    />
  )
}

export const ScJSONEditField = ({
  onUpdate = (...up) => {
    console.log('ScJsonEditField update', up)
  },
  onClick,
  meta,
  value = '{}',
  code = '',
  label = '',
  labelPlacement = 'top',
  isGroupField = false,
  mb = 0,
  inputWidth = 100,
  updateDelay,
  tooltipText = '',
  helperText = '',
  labelFontProps = { fontWeight: '', fontSize: '' },
  ...props
}) => {
  const labelProps = {
    label,
    code,
    labelPlacement,
    isGroupField,
    disabled: props.disabled,
    inputWidth,
    mb,
    helperText,
    tooltipText,
    labelFontProps
  }
  return (
    <ScFieldLabel {...labelProps}>
      <ScJSONEditComponent
        onUpdate={onUpdate}
        onClick={onClick}
        meta={meta}
        value={value}
        code={code}
        updateDelay={updateDelay}
        viewOnly={props.disabled}
      />
    </ScFieldLabel>
  )
}

export default ScJSONEditField

ScJSONEditField.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  tooltipText: PropTypes.string,
  code: PropTypes.string,

  updateDelay: PropTypes.number,
  mb: PropTypes.number,

  isGroupField: PropTypes.bool,
  disabled: PropTypes.bool,

  labelPlacement: PropTypes.oneOf(['top', 'top-big', 'start', 'end', '']),
  variant: PropTypes.oneOf(['outlined', 'standard']),

  value: PropTypes.string,
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  labelFontProps: PropTypes.shape({
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string
  }),

  onUpdate: PropTypes.func
}
