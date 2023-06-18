import React from 'react'

import { argTypes } from './argTypes'
import { getOptions, getValue } from '../../../../mocks'
import { ScNestedValuesMapField } from '../ScNestedValuesMapField'

export default {
  title: 'EDITABLE FIELDS/Group field/ScNestedValuesMapField/Props',
  component: ScNestedValuesMapField,
  argTypes,
  args: {
    value: getValue('nested-object'),
    labelPlacement: 'start',
    code: 'nested-map-field',
    meta: { options: getOptions() }
  }
}

const Template = (args) => <ScNestedValuesMapField {...args} />

export const Default = Template.bind({})
Default.args = {
  value: {}
}

export const WithFontProps = Template.bind({})
WithFontProps.args = {
  label: 'With custom font props',
  fieldFontProps: { fontSize: '20px', fontWeight: '500' },
  labelFontProps: { fontSize: '10px', fontWeight: '500' }
}

export const WithInitValue = Template.bind({})
WithInitValue.args = {
  label: 'With init value'
}

export const WithFixedKeys = Template.bind({})
WithFixedKeys.args = {
  fixedKeys: true,
  label: 'With fixed keys',
  meta: { options: getOptions() }
}

export const WithReadOnlyKeys = Template.bind({})
WithReadOnlyKeys.args = {
  readonlyKeys: true,
  label: 'With readOnly keys',
  meta: { options: getOptions() }
}

Default.storyName = 'Default'
WithFontProps.storyName = 'Font props'
WithInitValue.storyName = 'With init value'
WithFixedKeys.storyName = 'Fixed keys'
WithReadOnlyKeys.storyName = 'ReadOnly keys'
