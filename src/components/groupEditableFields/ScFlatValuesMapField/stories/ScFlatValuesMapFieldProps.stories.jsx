import React from 'react'

import { argTypes } from './argTypes'
import { getOptions, getValue } from '../../../../mocks'
import { ScFlatValuesMapField } from '../ScFlatValuesMapField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScFlatValuesMapField/Props',
  component: ScFlatValuesMapField,
  argTypes,
  args: {
    labelPlacement: 'start',
    code: 'flat-map-field',
    meta: { options: getOptions() }
  }
}

const Template = (args) => <ScFlatValuesMapField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithEmptyValue = Template.bind({})
WithEmptyValue.args = {
  value: getValue('object-empty')
}

export const WithFontProps = Template.bind({})
WithFontProps.args = {
  label: 'With custom font props',
  value: getValue('object'),
  fieldFontProps: { fontSize: '20px', fontWeight: '500' },
  labelFontProps: { fontSize: '10px', fontWeight: '500' }
}

export const WithInitValue = Template.bind({})
WithInitValue.args = {
  value: getValue('object'),
  label: 'With init value'
}

export const WithFixedKeys = Template.bind({})
WithFixedKeys.args = {
  fixedKeys: true,
  value: getValue('object'),
  label: 'With fixed keys',
  meta: { options: getOptions() }
}

export const WithReadOnlyKeys = Template.bind({})
WithReadOnlyKeys.args = {
  readonlyKeys: true,
  value: getValue('object'),
  label: 'With readOnly keys',
  meta: { options: getOptions() }
}

Default.storyName = 'Default'
WithEmptyValue.storyName = 'Empty value'
WithFontProps.storyName = 'Font props'
WithInitValue.storyName = 'With init value'
WithFixedKeys.storyName = 'Fixed keys'
WithReadOnlyKeys.storyName = 'ReadOnly keys'
