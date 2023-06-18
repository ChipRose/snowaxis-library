import React from 'react'

import { argTypes } from './argTypes'
import { ScJSONEditField } from '../ScJSONEditField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScJSONEditField/Labeled',
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

export const TopBigLabel = Template.bind({})
TopBigLabel.args = {
  labelPlacement: 'top-big'
}

export const StartLabel = Template.bind({})
StartLabel.args = {
  labelPlacement: 'start'
}

export const EndLabel = Template.bind({})
EndLabel.args = {
  labelPlacement: 'end'
}

Default.storyName = 'Default label'
TopBigLabel.storyName = 'Top big label'
StartLabel.storyName = 'Start label'
EndLabel.storyName = 'End label'
