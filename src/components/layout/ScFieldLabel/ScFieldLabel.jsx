import React from 'react'
import { SnowInputLabel, SnowTooltip, SnowTypography } from '../../../adapter'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const MainBoxView = styled.div`
  ${({ width }) => (width ? `width: ${width};` : '')}
  margin-bottom: ${({ mb }) => mb};
`

const FieldBasicBoxView = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-width: 150px;
  min-height: 100%;
  box-sizing: border-box;
  input::placeholder {
    opacity: 1;
    ${({ theme }) => `
      color: ${theme.mainPalette.typography.light};
      font-size: inherit;
      font-weight: inherit;
  `}
  }
  ${({ variant }) =>
    variant === 'outlined'
      ? css`
          border: 1px solid;
          border-radius: 3px;
        `
      : css`
          border-top: none;
          border-right: none;
          border-left: none;
          border-bottom: 1px solid;
        `}
  border-color: ${({ theme, iserror }) =>
    iserror
      ? theme.mainPalette.warning.secondary
      : theme.mainPalette.grey.border};
  overflow: hidden;
  background: ${({ theme }) => theme.mainPalette.color.contrast};
  :hover {
    border-color: ${({ theme }) => theme.mainPalette.grey.dark};
  }
`

const FieldsetView = styled.fieldset`
  ${FieldBasicBoxView}
  input, div {
    font-weight: ${({ theme, fontWeight }) =>
      fontWeight ? fontWeight : theme.fontWeight.thin};
  }
  display: inline-flex;
  .MuiSelect-select {
    min-height: 100%;
    margin-top: -3px;
  }
  input {
    margin-top: -3px;
  }
  div input {
    margin-top: -3px;
  }
  button {
    margin-top: -3px;
  }
  padding: 0;
  box-sizing: border-box;
  width: ${({ width }) => width};
  height: 100%;
`

const StartEndFieldView = styled.div`
  ${FieldBasicBoxView}
  input, div {
    font-weight: ${({ theme, fontWeight }) =>
      fontWeight ? fontWeight : theme.fontWeight.thin};
  }
`

const LegendView = styled.legend`
  margin-left: 5px;
  margin-bottom: 0;
  width: auto;
  max-width: 88%;
  font-weight: ${({ theme }) => theme.fontWeight.thin};
`

const TopLabelView = styled(SnowInputLabel)`
  margin-bottom: 0;
  cursor: pointer;
  &.MuiFormLabel-root {
    padding: 0 5px;
    word-break: break-all;
    font-size: 0.75rem;
    font-weight: ${({ theme }) => theme.fontWeight.thin};
    color: ${({ theme, iserror }) =>
      iserror
        ? theme.mainPalette.warning.secondary
        : theme.mainPalette.grey.main};
    opacity: ${({ disabled }) => (disabled ? '0.7' : '')};
  }
`

const StartEndLabelView = styled(SnowInputLabel)`
  flex: 0 0 auto;
  max-width: 50%;
  cursor: pointer;
  &.MuiFormLabel-root {
    ${({ theme, fontSize, fontWeight }) => `
      font-size: ${fontSize ? fontSize : theme.fontSize.main};
      font-weight: ${fontWeight ? fontWeight : theme.fontWeight.thin};
    `}
    color: ${({ theme, iserror }) =>
      iserror
        ? theme.mainPalette.warning.secondary
        : theme.mainPalette.typography.main};
    opacity: ${({ disabled }) => (disabled ? '0.7' : '')};
  }
  ${({ isstart, ishelpertext, istopbig }) => {
    if (isstart) {
      return ishelpertext
        ? css`
            margin: 13px 20px auto 0;
            order: 0;
          `
        : css`
            margin: auto 20px auto 0;
            order: 0;
          `
    } else {
      return ishelpertext
        ? css`
            margin: 13px 0 auto 20px;
            order: 1;
          `
        : css`
            margin: ${istopbig ? '0 0 8px' : 'auto 0 auto 20px'};
            order: 1;
          `
    }
  }}
`

const StartEndFieldBoxView = styled.div`
  width: ${({ width }) => width};
`

const StartEndBoxView = styled.div`
  display: ${({ istopbig }) => (istopbig ? 'block' : 'flex')};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: start;
`

const TopBoxView = styled.div`
  width: 100%;
`

const HelperTextView = styled(SnowTypography).attrs({
  component: 'p'
})`
  &.MuiTypography-root {
    padding: 5px 0;
    margin: 0;
    font-size: 12px;
    width: ${({ width }) => width};
    color: ${({ theme, iserror }) =>
      iserror
        ? theme.mainPalette.warning.secondary
        : theme.mainPalette.grey.main};
    text-align: left;
  }
`

export const ScFieldLabel = ({
  isInvalid = false,
  helperText = '',
  label = '',
  code = 'field',
  variant = 'outlined',
  labelPlacement = 'top',
  isGroupField = false,
  inputWidth = 100,
  mb = 0,
  children = {},
  tooltipText = '',
  labelFontProps = { fontWeight: '', fontSize: '' },
  fieldFontProps = { fontWeight: '', fontSize: '' },
  ...props
}) => {
  const isLabelExist = label ? true : false
  const isTopLabel = isLabelExist && labelPlacement === 'top' ? 1 : 0
  const isTopBigLabel = isLabelExist && labelPlacement === 'top-big' ? 1 : 0
  const isStartLabel = isLabelExist && labelPlacement === 'start' ? 1 : 0
  const isHelperText = helperText ? 1 : 0
  const width = typeof inputWidth === 'number' ? `${inputWidth}%` : inputWidth
  const isError = isInvalid ? 1 : 0
  const marginBottom = mb ? `${mb}px` : 0
  const fullLabel = isLabelExist && props.required ? `${label}*` : label
  const HelperElement = ({ helperText }) => {
    return (
      <HelperTextView width={width} iserror={isError}>
        {helperText}
      </HelperTextView>
    )
  }

  const child = {
    ...children,
    props: {
      // error: isInvalid,
      ...children.props
    }
  }

  return (
    <MainBoxView
      aria-label="field-label"
      mb={marginBottom}
      width={isTopLabel ? width : '100%'}
    >
      {isTopLabel ? (
        <TopBoxView
          className={'ScFieldWrapper'}
          role="field-wrapper"
          {...fieldFontProps}
        >
          <FieldsetView
            variant={variant}
            iserror={isError}
            width={width === 'auto' ? 'auto' : '100%'}
          >
            {isLabelExist && (
              <LegendView>
                <TopLabelView
                  htmlFor={code}
                  iserror={isError}
                  disabled={props.disabled}
                  role="label"
                  id={`label-${code}`}
                >
                  {fullLabel}
                </TopLabelView>
              </LegendView>
            )}
            {tooltipText ? (
              <SnowTooltip
                title={tooltipText}
                placement="bottom-end"
                role="tooltip"
              >
                <div style={{ width: '100%' }}>{child}</div>
              </SnowTooltip>
            ) : (
              <>{child}</>
            )}
          </FieldsetView>
          {Boolean(isHelperText) && <HelperElement helperText={helperText} />}
        </TopBoxView>
      ) : (
        <StartEndBoxView
          istopbig={isTopBigLabel}
          justifyContent={isGroupField ? 'space-between' : 'flex-start'}
        >
          {isLabelExist && (
            <StartEndLabelView
              htmlFor={code}
              id={`label-${code}`}
              isstart={isStartLabel}
              iserror={isError}
              istopbig={isTopBigLabel}
              ishelpertext={isHelperText}
              disabled={props.disabled}
              {...labelFontProps}
              role="label"
            >
              {fullLabel}
            </StartEndLabelView>
          )}
          <StartEndFieldBoxView width={width} role="field-wrapper">
            <StartEndFieldView
              {...fieldFontProps}
              variant={variant}
              iserror={isError}
              isstart={isStartLabel}
              className={'ScFieldWrapper'}
            >
              {tooltipText ? (
                <SnowTooltip
                  title={tooltipText}
                  placement="bottom-end"
                  role="tooltip"
                >
                  <div style={{ width: '100%' }}>{child}</div>
                </SnowTooltip>
              ) : (
                <>{child}</>
              )}
            </StartEndFieldView>
            {Boolean(isHelperText) && <HelperElement helperText={helperText} />}
          </StartEndFieldBoxView>
        </StartEndBoxView>
      )}
    </MainBoxView>
  )
}

export default ScFieldLabel

ScFieldLabel.propTypes = {
  isInvalid: PropTypes.bool,
  isGroupField: PropTypes.bool,
  helperText: PropTypes.string,
  tooltipText: PropTypes.string,
  label: PropTypes.string,
  code: PropTypes.string,
  mb: PropTypes.number,
  variant: PropTypes.oneOf(['outlined', 'standard']),
  labelPlacement: PropTypes.oneOf(['top', 'top-big', 'start', 'end', '']),
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.object,
  labelFontProps: PropTypes.object,
  fieldFontProps: PropTypes.object
}
