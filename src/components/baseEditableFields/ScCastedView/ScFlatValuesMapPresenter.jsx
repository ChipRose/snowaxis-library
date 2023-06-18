import React from 'react'
import { SnowBox } from '../../../adapter'
import { prettifyJsonOutput } from '../../../util'
import styled from 'styled-components'

const FlatMapPresenterView = styled(SnowBox)`
  pre {
    color: ${({ theme }) => theme.mainPalette.grey[200]};
    margin: 0;
  }
`

const ScFlatValuesMapPresenter = ({
  label = '',
  value = {},
  empty = '(Not set)'
}) => {
  if (!value && typeof value !== 'object' && !Array.isArray(value)) return empty
  return (
    <FlatMapPresenterView aria-label={"map-presenter"}>{prettifyJsonOutput(value)}</FlatMapPresenterView>
  )
}

export default ScFlatValuesMapPresenter
