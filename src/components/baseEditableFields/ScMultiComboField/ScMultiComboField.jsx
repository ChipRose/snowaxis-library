import React from 'react'
import ScBaseMultiAutocomplete from './ScBaseMultiAutocomplete'
import PropTypes from 'prop-types'

const getOptions = (meta) => {
  if (!Array.isArray(meta?.options) && !meta.optionsDef?.value)
    return meta?.emptyOption
      ? { ...meta.options, ...meta.emptyOption }
      : meta.options
  if (Array.isArray(meta?.options) && meta?.options?.length)
    return meta?.emptyOption
      ? [...meta.options, meta?.emptyOption]
      : meta.options
  return []
}

const getError = (meta, required) => {
  return !getOptions(meta)?.length && required ? true : false
}

const getErrorText = (meta, required) => {
  let rezult = ''

  if (getOptions(meta)?.length === 0) {
    rezult = required ? 'Error: There are no options' : 'No options to choose'
  }
  return rezult
}

export const ScMultiComboField = ({
  onUpdate = () => {},
  code = '',
  value: incomeValue = [],
  meta = {
    options: [],
    emptyOption: {},
    optionsDef: {}
  },
  labelPlacement = 'top',
  label = '',
  inputWidth = 100,
  multiple = true,
  isInvalid = false,
  helperText = '',
  tooltipText = '',
  fieldFontProps = { fontSize: '', fontWeight: '' },
  labelFontProps = { fontSize: '', fontWeight: '' },
  placeholder = '',
  variant = 'outlined',
  isGroupField = false,
  mb = 0,
  ...props
}) => {
  const labelProps = {
    label,
    labelPlacement,
    inputWidth,
    code,
    variant,
    labelFontProps,
    fieldFontProps,
    tooltipText,
    required: props.required,
    disabled: props.disabled,
    isGroupField,
    mb,
    helperText: getErrorText(meta, props.required) || helperText,
    isInvalid: getError(meta, props.required) ? true : isInvalid
  }

  return (
    <ScBaseMultiAutocomplete
      value={incomeValue}
      code={code}
      labelProps={labelProps}
      placeholder={placeholder}
      fieldFontProps={fieldFontProps}
      metaOptions={getOptions(meta)}
      emptyOption={meta.emptyOption}
      required={props.required}
      disabled={props.disabled}
      optionsDef={meta.optionsDef}
      multiple={multiple}
      InputProps={{
        required: props.required,
        'aria-invalid': isInvalid
      }}
      isInvalid={getError(meta, props.required) ? true : isInvalid}
      onUpdate={onUpdate}
    />
  )
}

export default ScMultiComboField

ScMultiComboField.propTypes = {
  tooltipText: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  code: PropTypes.string,

  required: PropTypes.bool,
  disabled: PropTypes.bool,
  isGroupField: PropTypes.bool,

  mb: PropTypes.number,

  value: PropTypes.array,
  labelPlacement: PropTypes.oneOf(['top', 'top-big', 'start', 'end', '']),
  variant: PropTypes.oneOf(['standard', 'outlined']),

  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  meta: PropTypes.oneOfType([
    PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.string)
    }),
    PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.object)
    }),
    PropTypes.shape({
      options: PropTypes.object
    }),
    PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.object),
      optionsDef: {
        label: PropTypes.string,
        value: PropTypes.string,
        tag: PropTypes.string
      }
    }),
    PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.object),
      emptyOption: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        code: PropTypes.string
      }),
      optionsDef: {
        label: PropTypes.string,
        value: PropTypes.string,
        tag: PropTypes.string
      }
    })
  ]),

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
