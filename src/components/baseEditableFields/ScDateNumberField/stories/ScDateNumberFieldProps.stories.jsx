import React from 'react'

import { argTypes } from './argTypes'
import { ScDateNumberField } from '../ScDateNumberField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScDateNumberField/Props',
  component: ScDateNumberField,
  argTypes,
  args: {
    placeholder: '(not set)',
    code: 'date-number-field'
  }
}

const Template = (args) => <ScDateNumberField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithInitValue = Template.bind({})
WithInitValue.args = {
  value: {start: '2022-07-21', end: '2022-08-23'},
  label: 'Field with init value'
}

Default.storyName = 'Default'
