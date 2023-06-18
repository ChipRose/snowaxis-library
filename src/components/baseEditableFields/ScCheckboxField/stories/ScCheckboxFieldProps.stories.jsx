import React from 'react'

import { argTypes } from './argTypes'
import { ScCheckboxField } from '../ScCheckboxField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScCheckboxField/Props',
  component: ScCheckboxField,
  argTypes: argTypes,
  args: {
    code: 'checkbox-field'
  }
}

const Template = (args) => <ScCheckboxField {...args} />

export const Default = Template.bind({})
Default.args = {}

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

export const CheckedValue = Template.bind({})
CheckedValue.args = {
  value: true,
  label: 'Checked field'
}

Default.storyName = 'Default'
Disabled.storyName = 'Disabled'
CheckedValue.storyName = 'Checked'
RequiredField.storyName = 'Required'
