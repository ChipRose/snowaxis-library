import React from 'react'

import { argTypes } from './argTypes'
import { getOptions } from '../../../../mocks'
import { ScComboField } from '../ScComboField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScComboField/Props',
  component: ScComboField,
  argTypes,
  args: {
    placeholder: 'Type or choose some options',
    labelPlacement: 'start',
    code: 'combo-field',
    meta: { options: getOptions()}
  }
}

const Template = (args) => <ScComboField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const DisableFree = Template.bind({})
DisableFree.args = {
  freeSolo: false,
  label: 'Choose value from list',
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
  value: 'item-1',
  fieldFontProps: { fontSize: '20px', fontWeight: '500' },
  labelFontProps: { fontSize: '10px', fontWeight: '500' }
}

export const WithNewValue = Template.bind({})
WithNewValue.args = {
  label: 'With new init value',
  value: 'new value'
}

export const WithValue = Template.bind({})
WithValue.args = {
  label: 'With init value',
  value: 'item-2'
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  label: 'Some important label',
  helperText: 'Some extra information'
}

export const SwitchNewValueIndicator = Template.bind({})
SwitchNewValueIndicator.args = {
  label: 'Field with new value',
  value: 'new value',
  disableIndicatorNewValue: true,
  tooltipNewValue: false
}

Default.storyName = 'Default'
InvalidValue.storyName = 'Invalid value'
Disabled.storyName = 'Disabled'
Required.storyName = 'Required'
WithFontProps.storyName = 'Font props'
DisableFree.storyName = 'Disable free'
WithNewValue.storyName = 'New value'
WithValue.storyName = 'With value'
WithHelperText.storyName = 'Helper text'
SwitchNewValueIndicator.storyName='Switch new value indicator'