import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'
import { SnowClickAwayListener } from '../../../adapter'
import {
  ScTextField,
  ScDropdownField,
  ScCheckboxField,
  ScComboField,
  ScDateField,
  ScMultiComboField,
  ScJSONEditField,
  ScDateNumberField,
  ScCastedView
} from '../../baseEditableFields'
import {
  ScFlatValuesListField,
  ScFlatValuesMapField,
  ScNestedValuesMapField
} from '../../groupEditableFields'
import {
  updatedScFieldError,
  updatedScFieldValue,
  useScFieldState
} from './data/updatedFieldData'
import { isJSON, transformOptions } from '../../../util'
import { ScEditType } from './EditTypes'
import PropTypes from 'prop-types'

//-ConfigGroup.js -saUser.js -apiDataRequestor.js -scMessage.js -fetches.js -ConfigView.js -ConfigSaver.js -IntegrationSettings.js

/**
 *
 * @param error
 * @param resetErrorBoundary
 * @returns {JSX.Element}
 * @constructor
 */
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try to reset to default?</button>
    </div>
  )
}

/**
 *
 * @param meta
 * @param value
 * @param label
 * @param code
 * @param onEditEnd
 * @param onEditStart
 * @param onUpdate
 * @param edit
 * @param required
 * @returns {JSX.Element}
 * @constructor
 */
export const ScGeneralField = React.memo(
  ({
    meta: _meta = {
      editType: 'text', //text|enum| upcoming :checkbox, numbers
      values: [], // todo:change to options in API responses
      options: null, //for case of enum - pairs array [{incomeValue:label},..]
      optionsDef: null, //{value:'',label:''} <- keys to extract value=>label pair from options
      editable: true,
      isInvalid: false,
      isIndependent: true,
      tooltip: '',
      tooltipNewValue: true,
      disableIndicatorNewValue: true
    },
    freeSolo = true,
    updateDelay = 1,
    renderer,
    value: incomeValue = '',
    label = '',
    labelPlacement = 'top',
    fieldFontProps = {fontSize: '', fontWeight: '' },
    labelFontProps = {fontSize: '', fontWeight: '' },
    variant = 'outlined',
    isGroupField = false,
    inputWidth=100,
    noPadding = false,
    code = '',
    onEditEnd = () => {},
    onEditStart = () => {},
    onUpdate = () => {},
    onError = () => {},
    edit = false,
    cacheable = true,
    uid = null,
    tooltip = '',
    ...props
  }) => {
    const prepareMeta = (meta) => {
      const {
        editType = ScEditType.Text, //text|enum| upcoming :checkbox, numbers
        values = [], // todo:change to options in API responses
        options = null, //for case of enum - pairs array [{incomeValue:label},..]
        optionsDef = null, //{value:'',label:''} <- keys to extract value=>label pair from options
        editable = true,
        isInvalid = false,
        isIndependent = true,
        tooltip = '',
        tooltipNewValue = true,
        disableIndicatorNewValue = true,
        ...rest
      } = meta
      return {
        editType,
        options: transformOptions(meta),
        optionsDef,
        editable,
        isInvalid,
        isIndependent,
        tooltip,
        tooltipNewValue,
        ...rest
      }
    }
    const meta = prepareMeta(_meta)
    const _uuid = uid || code || label //?? v4()
    const [_value, setValue] = useState(incomeValue)
    const [errors, setErrors] = useState([])

    const [updatedValueState, setUpdatedValueState] = useRecoilState(
      updatedScFieldValue(_uuid)
    )
    const [updatedScFieldFullState, setUpdatedScFieldFullState] =
      useScFieldState(_uuid)
    const setFieldErrorInUpdate = useSetRecoilState(updatedScFieldError(_uuid))
    const resetFieldErrorInUpdate = useResetRecoilState(
      updatedScFieldError(_uuid)
    )
    const JSONwaitedFields = [
      'readonly_key_map',
      'map',
      '2levels_map_list',
      'fixed_key_map'
    ]

    const jsonedValue =
      JSONwaitedFields.includes(meta.editType) && typeof _value === 'string'
        ? isJSON(_value)
          ? JSON.parse(_value)
          : {}
        : _value

    const fieldProps = {
      isGroupField,
      inputWidth,
      labelFontProps,
      labelPlacement,
      variant,
      ...{ label },
      ...{ value: jsonedValue || _value },
      ...{ code },
      ...{ meta },
      tooltip,
      ...props
    }

    const extraFieldProps = {
      updateDelay,
      fieldFontProps
    }

    const handleError = (fieldDataErrors = []) => {
      //update errors if previous or incoming are not empty
      ;(errors.length || fieldDataErrors.length) && setErrors(fieldDataErrors)
    }

    useEffect(() => {
      errors?.length ? setFieldErrorInUpdate(errors) : resetFieldErrorInUpdate()
      onError(errors)
    }, [errors])

    //todo: right now designed to handle JSON field exception. Needs to make it universal
    const onErrorReset = () => {
      setValue(
        meta?.defaultValue ||
          (typeof incomeValue !== 'undefined' && incomeValue) ||
          {}
      )
    }
    const onCastedClick = () => {
      onEditStart(code)
      // editing.current = true
    }
    const onEditClick = () => {
      // setIsActive(true)
      onEditStart(code)
    }
    useEffect(() => {
      return () => {
        meta?.editType === 'multiselect' &&
          console.log('multiselect destructed')
        if (cacheable) return
        setUpdatedValueState(incomeValue)
        setUpdatedScFieldFullState(fieldProps)
      }
    }, [])

    useEffect(() => {
      if (typeof incomeValue === 'undefined') return

      setValue(incomeValue)
    }, [incomeValue])

    useEffect(() => {
      if (typeof incomeValue === 'undefined' || incomeValue === null) return
      setValue(incomeValue)
    }, [meta?.editType])

    const handleUpdate = ({ value }) => {
      if (typeof value === 'undefined' || value === null) return

      setValue((prevValue) => {
        return value
      })
      onUpdate({ code, value })
      setUpdatedValueState(value)
      setUpdatedScFieldFullState(fieldProps)
    }

    const EditTypeMapping = new Map([
      [['text', 'number', 'integer'], (props) => <ScTextField {...props} {...extraFieldProps}/>],
      [['longtext', 'image'], (props) => <ScTextField multiline {...props} {...extraFieldProps}/>],
      [['flat_list'], (props) => <ScFlatValuesListField {...props} {...extraFieldProps}/>],
      [
        ['fixed_flat_list'],
        (props) => <ScFlatValuesListField {...props} fixedKeys {...extraFieldProps}/>
      ],
      [['map'], (props) => <ScFlatValuesMapField {...props} {...extraFieldProps}/>],
      [
        ['fixed_key_map'],
        (props) => <ScFlatValuesMapField {...props} fixedKeys {...extraFieldProps} />
      ],
      [
        ['readonly_key_map'],
        (props) => <ScFlatValuesMapField {...props} readonlyKeys {...extraFieldProps}/>
      ],
      [['2levels_map_list'], (props) => <ScNestedValuesMapField {...props} {...extraFieldProps}/>],
      [['date'], (props) => <ScDateField {...props} {...extraFieldProps}/>],
      [['combo', 'autocomplete'], (props) => <ScComboField {...props} freeSolo={freeSolo} {...extraFieldProps}/>],
      [
        ['multicombo', 'multiselect'],
        (props) => <ScMultiComboField {...props} fieldFontProps={fieldFontProps} />
      ],
      [['boolean', 'checkbox'], (props) => <ScCheckboxField {...props} />],
      [
        ['date-number'],
        (props) => <ScDateNumberField {...props} readonlyKeys fieldFontProps={fieldFontProps} />
      ],
      [['select', 'dropdown'], (props) => <ScDropdownField {...props} {...extraFieldProps} />],
      [['JSON'], (props) => <ScJSONEditField {...props} updateDelay={updateDelay}/>]
    ])

    const fieldToOutputKey = useMemo(
      () =>
        Array.from(EditTypeMapping.keys()).find((typeKeys) => {
          return typeKeys.includes(meta.editType)
        }),
      [uid, code, label]
    )

    const FieldToEdit = useMemo(
      () => fieldToOutputKey && EditTypeMapping.get(fieldToOutputKey),
      [uid, code, label]
    )

    return (
      <Fragment>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onErrorReset}>
          {edit && meta.editable !== false ? (
            <SnowClickAwayListener
              onClickAway={() => {}}
            >
              <Fragment>
                <FieldToEdit
                  {...fieldProps}
                  onUpdate={handleUpdate}
                  onError={handleError}
                  onClick={onEditClick}
                />
              </Fragment>
            </SnowClickAwayListener>
          ) : (
            <ScCastedView
              {...fieldProps}
              isGroupField={isGroupField}
              fieldFontProps={fieldFontProps}
              labelFontProps={labelFontProps}
              tooltip={tooltip}
              noPadding={noPadding}
              inputWidth={inputWidth}
              onClick={onCastedClick}
              renderer={renderer}
            />
          )}
        </ErrorBoundary>
      </Fragment>
    )
  }
)

ScGeneralField.displayName = 'ScGeneralField'

ScGeneralField.propTypes = {
  edit: PropTypes.bool,
  isGroupField: PropTypes.bool,
  required: PropTypes.bool,

  meta: PropTypes.shape({
    editType: PropTypes.oneOf([
      'text',
      'number',
      'date-number',
      'date',
      'longtext',
      'JSON',
      'image',
      'combo',
      'link',
      'dropdown', //sinonym of select
      'multiselect',
      'multicombo',
      'select',
      'checkbox', //sinonym of boolean
      'boolean',
      '2levels_map_list',
      'fixed_key_map',
      'readonly_key_map',
      'flat_list',
      'fixed_flat_list',
      'map'
    ]),
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), //for case of enum - pairs array [{value:label},..]
    values: PropTypes.array, //depricated, todo:change to options in API responses
    editable: PropTypes.bool,
    isInvalid: PropTypes.bool
  }),

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelPlacement: PropTypes.oneOf(['top', 'start', 'end','top-big', '']),

  label: PropTypes.string,
  code: PropTypes.string,

  renderer: PropTypes.func,
  onEditEnd: PropTypes.func,
  onEditStart: PropTypes.func,
  onUpdate: PropTypes.func,

  // location: PropTypes.shape({
  //   pathname: PropTypes.string
  // }).isRequired,
  // children: PropTypes.element.isRequired
}
export default ScGeneralField
