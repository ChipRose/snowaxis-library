import React from 'react'

import { argTypes } from './argTypes'
import { getOptions } from '../../../../mocks'
import { ScMultiComboField } from '../ScMultiComboField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScMultiComboField/Labeled',
  component: ScMultiComboField,
  argTypes,
  args: {
    placeholder: 'Type or choose some options',
    label: 'Some important label',
    code: 'combo-field',
    meta: { options: getOptions() }
  }
}

const Template = (args) => <ScMultiComboField {...args} />

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