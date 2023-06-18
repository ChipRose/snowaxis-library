import React from 'react'

import { argTypes } from './argTypes'
import { ScDateRangeField } from '../ScDateRangeField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScDateRangeField/Props',
  component: ScDateRangeField,
  argTypes,
  args: {
    labelPlacement: 'start',
    placeholder: '(not set)',
    code: 'date-range-field'
  }
}

const Template = (args) => <ScDateRangeField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const InvalidValue = Template.bind({})
InvalidValue.args = {
  label: 'Invalid value',
  isInvalid: true,
  helperText: 'There is some problem'
}

export const RequiredField = Template.bind({})
RequiredField.args = {
  label: 'Required value',
  required: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled field',
  disabled: true
}

export const WithInitValue = Template.bind({})
WithInitValue.args = {
  value: {start: '2022-07-21', end: '2022-08-23'},
  label: 'Field with init value'
}

export const WithFontProps = Template.bind({})
WithFontProps.args = {
  label: 'With custom font props',
  value: '2022-07-21',
  fieldFontProps: { fontSize: '20px', fontWeight: '500' },
  labelFontProps: { fontSize: '10px', fontWeight: '500' }
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  label: 'Some important label',
  helperText: 'Some extra information'
}

Default.storyName = 'Default'
InvalidValue.storyName = 'Invalid value'
Disabled.storyName = 'Disabled'
RequiredField.storyName = 'Required'
WithFontProps.storyName = 'Font props'
WithHelperText.storyName = 'Helper text'
