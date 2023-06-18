import React from 'react'

import { argTypes } from './argTypes'
import { getOptions, getValue } from '../../../../mocks'
import { ScDropdownField } from '../ScDropdownField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScDropdownField/Props',
  component: ScDropdownField,
  argTypes,
  args: {
    value: getValue('simple'),
    labelPlacement: 'start',
    code: 'select-field',
    meta: { options: getOptions()}
  }
}

const Template = (args) => <ScDropdownField {...args} />

export const Default = Template.bind({})
Default.args = {
  value:'',
}

export const InvalidValue = Template.bind({})
InvalidValue.args = {
  isInvalid: true,
  label: 'Invalid value',
  helperText: 'There is some problem'
}

export const Required = Template.bind({})
Required.args = {
  required: true,
  label: 'Required value'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  label: 'Disabled field'
}

export const WithFontProps = Template.bind({})
WithFontProps.args = {
  label: 'With custom font props',
  fieldFontProps: { fontSize: '20px', fontWeight: '500' },
  labelFontProps: { fontSize: '10px', fontWeight: '500' }
}

export const WithValue = Template.bind({})
WithValue.args = {
  label: 'With init value',
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  label: 'Some important label',
  helperText: 'Some extra information'
}

Default.storyName = 'Default'
InvalidValue.storyName = 'Invalid value'
Disabled.storyName = 'Disabled'
Required.storyName = 'Required'
WithFontProps.storyName = 'Font props'
WithValue.storyName = 'With value'
WithHelperText.storyName = 'Helper text'
