import React from 'react'

import { argTypes } from './argTypes'
import { getOptions } from '../../../../mocks'
import { ScDropdownField } from '../ScDropdownField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScDropdownField/Labeled',
  component: ScDropdownField,
  argTypes,
  args: {
    label: 'Some important label',
    code: 'select-field',
    meta: { options: getOptions() }
  }
}

const Template = (args) => <ScDropdownField {...args} />

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

Default.storyName = 'Default label'
