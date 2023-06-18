import React from 'react'

import { argTypes } from './argTypes'
import { ScDateField } from '../ScDateField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScDateField/Props',
  component: ScDateField,
  argTypes: argTypes,
  args: {
    placeholder: 'Type or choose date',
    code: 'date-field'
  }
}

const Template = (args) => <ScDateField {...args} />

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
  value: '2022-07-21',
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
Disabled.storyName = 'Disabled'
WithInitValue.storyName = 'With value'
InvalidValue.storyName = 'Invalid value'
RequiredField.storyName = 'Required'
WithFontProps.storyName = 'Font props'
WithHelperText.storyName = 'Helper text'
