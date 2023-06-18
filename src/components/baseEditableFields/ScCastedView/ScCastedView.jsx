import React, { useContext } from 'react'
import { format } from 'date-fns'
import { SnowAvatar, SnowInputLabel, SnowTypography } from '../../../adapter'
import { ScJSONEditField } from '../../baseEditableFields'
import ScFlatValuesMapPresenter from './ScFlatValuesMapPresenter'
import ScFlatValuesListPresenter from './ScFlatValuesListPresenter'
import LinkFieldViewer from './LinkFieldViewer'
import { transformOptions, prettifyJsonOutput } from '../../../util'
import styled, { ThemeContext } from 'styled-components'

const CastedValueBoxView = styled.div`
  padding: ${({ ispadding }) => (ispadding ? '0' : `8px 0`)};
  display: flex;
  width: 100%;
  justify-content: ${({ isGroupField }) =>
    isGroupField ? 'space-between' : 'flex-start'};
  align-items: center;
  ${({ color }) => (color ? `color:${color};` : ``)}
`

const CastedLabelView = styled(SnowInputLabel)`
  margin-right: 20px;
  margin-bottom: 0;
  min-width: fit-content;
  &.MuiFormLabel-root{
    ${({ theme, fontSize, fontWeight }) => `
      font-size: ${fontSize ? fontSize : theme.fontSize.main};
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
      line-height: ${theme.lineHeight.main};
      color: ${theme.mainPalette.typography.main};
    `}
  }
`

const CastedValueView = styled.div`
  flex: 0 1 ${({ inputWidth }) => (inputWidth ? `${inputWidth}%` : '100%')};
  width: ${({ inputWidth }) => (inputWidth ? `${inputWidth}%` : '100%')};
  word-break: break-word;
  p {
    color: inherit;
    ${({ fontSize, fontWeight, theme }) => `
      font-size: ${fontSize ? fontSize : theme.fontSize.main};
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
    `}
  }
  ul {
    padding: 0;
    li {
      padding: 0;
      display: inline-flex;
    }
  }
  .MuiTypography-root {
    ${({ theme, fontWeight, fontSize }) => `
    font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
    font-size: ${fontSize ? fontSize : theme.fontSize.main};
    color: ${theme.mainPalette.typography.main};
    `}
  }
`

const getFormattedDate = (date, dateFormat = 'eee Pp') =>
  date ? format(new Date(date), dateFormat) : '(Not set)'

const getOptionLabel = (value, meta) => {
  const { value: optValue = 'value', label: optLabel = 'label' } =
    meta?.optionsDef ?? {}

  const foundOption = meta?.options?.find((option) => {
    const isOptionOfValue = (option, value) => {
      if (typeof option === 'string') return option === value
      if (
        typeof option[optValue] !== 'undefined' &&
        typeof option[optLabel] !== 'undefined'
      )
        return option[optValue] === value

      return option?.[value]
    }
    return isOptionOfValue(option, String(value))
  })

  if (optValue && optLabel) return foundOption?.[optLabel]

  if (typeof foundOption === 'string') return foundOption

  return foundOption?.[value] ?? null
}

/**
 *
 * @param label - title for hint
 * @param meta - meta description of value  {
 *       editType: 'text', //text|enum| upcoming :checkbox, numbers
 *       options: [], //for case of enum - pairs array [{value:label},..]
 *       optionsDef: {value,label}, // to extract custom value,label from options
 *       editable: true,
 *       isInvalid: false
 *     },
 * @param value - value to display
 * @param onClick - callback onClick
 * @returns {JSX.Element} - Representation view of value
 * @constructor
 */

export const ScCastedView = React.memo(
  ({
    renderer,
    label,
    meta,
    value,
    onClick,
    inputWidth = 100,
    labelFontProps = { fontWeight: '', fontSize: '' },
    fieldFontProps = { fontWeight: '', fontSize: '' },
    isGroupField,
    noPadding,
    tooltip,
    ...rest
  }) => {
    const isSet = typeof value !== 'undefined' && value !== null
    const { editType: type } = meta
    //returns displayed value of dropdown item
    const internalOptions = transformOptions(meta)

    const textOf = (val) => {
      if (!val) return ''
      if (Array.isArray(val)) return val.join(', ')
      if (typeof val === 'object') return prettifyJsonOutput(val)
      return String(val)
    }
    const castedText = (val) => (val ? textOf(val) : `(not set)`)
    const castedCheckbox = (val) => JSON.stringify(val)
    const castedBoolean = (val) => (val ? 'yes' : 'no')
    const castedJSON = value ? value : []
    const castedImage = (value) => <SnowAvatar src={value.split(',')[0]} />

    const castedValueMapper = {
      text: (val) => castedText(val),
      longtext: (val) => (val ? val : `(not set)`),
      date: (val) => getFormattedDate(val).toUpperCase(),
      dropdown: (val) => getOptionLabel(val, meta) ?? castedText(val),
      select: (val) => getOptionLabel(val, meta) ?? castedText(val),
      multiselect: (val) =>
        val.map((item) => getOptionLabel(item, meta)).join(', ') ??
        castedText(val),
      combo: (val) => getOptionLabel(val, meta) ?? castedText(val),
      checkbox: (val) => castedCheckbox(val),
      boolean: (val) => castedBoolean(val),
      link: (val) => <LinkFieldViewer {...{ ...meta, label: val }} />,
      image: (val) => castedImage(val),
      imageLink: (val) => (
        <a href={`${val}`} target={'_blank'} rel={'noreferrer'}>
          View Image
        </a>
      ),
      'fixed_flat_list,flat_list': (val) => (
        <ScFlatValuesListPresenter label={label} value={val} meta={meta} />
      ),
      'map,fixed_key_map,readonly_key_map,2levels_map_list': (val) => (
        <ScFlatValuesMapPresenter label={label} value={val} meta={meta} />
      ),
      JSON: (val) => <ScJSONEditField value={castedJSON} viewOnly />
    }
    const fieldStandardOutput =
      castedValueMapper[
        Object.keys(castedValueMapper).find((typeKey) => typeKey.includes(type))
      ]
    //
    // console.log('Casted view', 1, label, 2, type, meta, 3, value, 4, onClick, {
    //   rest
    // })
    const theme = useContext(ThemeContext)
    return (
      <>
        {!renderer ? (
          <CastedValueBoxView
            aria-label={'casted-view'}
            onClick={onClick}
            color={
              isSet
                ? theme.mainPalette.grey.main
                : theme.mainPalette.grey.middle
            }
            isGroupField={isGroupField ? 1 : 0}
            ispadding={noPadding ? 1 : 0}
          >
            {label ? (
              <CastedLabelView {...labelFontProps}>
                {!!label && `${label}: `}
              </CastedLabelView>
            ) : null}
            <CastedValueView inputWidth={inputWidth} {...fieldFontProps}>
              <SnowTypography
                variant={'body1'}
                component={
                  typeof fieldStandardOutput?.(value) === 'string' ? 'p' : 'div'
                }
              >
                {fieldStandardOutput?.(value)}
              </SnowTypography>
            </CastedValueView>
          </CastedValueBoxView>
        ) : (
          renderer(value)
        )}
      </>
    )
  }
)
ScCastedView.displayName = 'CastedView'
export default ScCastedView
