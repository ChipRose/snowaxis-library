import React from 'react'

import { argTypes } from './argTypes'
import { ScSwitchField } from '../ScSwitchField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScSwitchField/Labeled',
  component: ScSwitchField,
  argTypes: argTypes,
  args: {
    code: 'switch-field'
  }
}

const Template = (args) => <ScSwitchField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithLabel = Template.bind({})
WithLabel.args = {
  labelStart: 'Disable',
  labelEnd: 'Enable'
}

Default.storyName = 'Default label'

