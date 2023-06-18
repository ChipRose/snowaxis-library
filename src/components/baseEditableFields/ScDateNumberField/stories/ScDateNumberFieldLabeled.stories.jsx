import React from 'react'

import { argTypes } from './argTypes'
import { ScDateNumberField } from '../ScDateNumberField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScDateNumberField/Labeled',
  component: ScDateNumberField,
  argTypes,
  args: {
    placeholder: '(not set)',
    code: 'date-number-field',
    value: "20"
  }
}

const Template = (args) => <ScDateNumberField {...args} />

export const Default = Template.bind({})
Default.args = {
}

// export const TopBigLabel = Template.bind({})
// TopBigLabel.args = {
//   labelPlacement: 'top-big'
// }

// export const StartLabel = Template.bind({})
// StartLabel.args = {
//   labelPlacement: 'start'
// }

// export const EndLabel = Template.bind({})
// EndLabel.args = {
//   labelPlacement: 'end'
// }

// Default.storyName = 'Default label'
// TopBigLabel.storyName = 'Top big label'
// StartLabel.storyName = 'Start label'
// EndLabel.storyName = 'End label'
