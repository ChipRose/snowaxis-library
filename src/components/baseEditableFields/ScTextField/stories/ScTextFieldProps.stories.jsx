import React from 'react'

import { argTypes } from './argTypes'
import { ScTextField } from '../ScTextField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScTextField/Props',
  component: ScTextField,
  argTypes: argTypes,
  args: {
    labelPlacement: 'start',
    placeholder: 'type some value',
    code: 'text-field'
  }
}

const ROLE = 'texbox'

const Template = (args) => <ScTextField {...args} />

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
  value: 'Some text',
  label: 'Field with init value'
}

export const WithFontProps = Template.bind({})
WithFontProps.args = {
  label: 'With custom font props',
  value: 'Some text',
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
