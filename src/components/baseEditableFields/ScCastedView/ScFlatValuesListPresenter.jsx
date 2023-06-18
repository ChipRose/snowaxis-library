import React from 'react'
import { SnowList, SnowListItem, SnowTypography, SnowBox } from '../../../adapter'

const ScFlatValuesListPresenter = ({ label, value = [], meta, ...props }) => {
  const { options, optionsDef } = meta //options [{id,name},...,{id,name}] or {[optionsDef.value],[optionsDef.label]}
  const valueKeys = Array.isArray(value) ? value?.filter(item => item).map((item) =>
    typeof item === 'object' ? item[optionsDef?.value] : item
  )
    : []
  const valueLabels = valueKeys.map(
    (valueKey) =>
      options.find((option) => option[optionsDef?.value] === valueKey)?.[
      optionsDef.label
      ] ?? valueKey
  )

  return (
    <SnowBox>
      <SnowList {...props}>
        {!!Array.isArray(valueLabels) &&
          valueLabels?.map((valueLabel, index) => (
            <SnowListItem key={index} {...props}>
              <SnowTypography>{valueLabel}</SnowTypography>
            </SnowListItem>
          ))}
      </SnowList>
    </SnowBox>
  )
}

export default ScFlatValuesListPresenter
