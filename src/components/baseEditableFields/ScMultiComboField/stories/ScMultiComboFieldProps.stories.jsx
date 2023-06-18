import React from 'react'

import { argTypes } from './argTypes'
import { getOptions, getValue } from '../../../../mocks'
import { ScMultiComboField } from '../ScMultiComboField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScMultiComboField/Props',
  component: ScMultiComboField,
  argTypes,
  args: {
    placeholder: 'Choose some options',
    labelPlacement: 'start',
    code: 'multi-combo-field',
    meta: {
      options: getOptions(),
    }
  }
}

const Template = (args) => <ScMultiComboField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithInitValue = Template.bind({})
WithInitValue.args = {
  label: 'With value',
  value: getValue('array')
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

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  label: 'Some important label',
  helperText: 'Some extra information'
}

Default.storyName = 'Default'
WithInitValue.storyName = 'With value'
InvalidValue.storyName = 'Invalid value'
Disabled.storyName = 'Disabled'
WithFontProps.storyName = 'Font props'
WithHelperText.storyName = 'Helper text'