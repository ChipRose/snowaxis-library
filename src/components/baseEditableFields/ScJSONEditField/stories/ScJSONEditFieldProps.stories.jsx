import React from 'react'

import { argTypes } from './argTypes'
import { getValue } from '../../../../mocks'
import { ScJSONEditField } from '../ScJSONEditField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScJSONEditField/Props',
  component: ScJSONEditField,
  argTypes: argTypes,
  args: {
    label: 'Some important label',
    code: 'JSON-field'
  }
}

const Template = (args) => <ScJSONEditField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled field',
  labelPlacement: 'start',
  disabled: true
}

export const WithInitValue = Template.bind({})
WithInitValue.args = {
  value: getValue('json'),
  label: 'Field with init value'
}

export const WithFontProps = Template.bind({})
WithFontProps.args = {
  label: 'With custom font props',
  labelPlacement: 'start',
  labelFontProps: { fontSize: '10px', fontWeight: '500' }
}

export const WithHelperText = Template.bind({})
WithHelperText.args = {
  label: 'Some important label',
  labelPlacement: 'start',
  helperText: 'Some extra information'
}

Default.storyName = 'Default'
Disabled.storyName = 'Disabled'
WithInitValue.storyName = 'With value'
WithFontProps.storyName = 'Font props'
WithHelperText.storyName = 'Helper text'
