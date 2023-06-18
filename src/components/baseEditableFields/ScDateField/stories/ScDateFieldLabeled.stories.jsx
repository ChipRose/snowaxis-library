import React from 'react'

import { argTypes } from './argTypes'
import { ScDateField } from '../ScDateField'

import { isSetFocus } from '../../../../util'

export default {
  title: 'EDITABLE FIELDS/Base field/ScDateField/Labeled',
  component: ScDateField,
  argTypes: argTypes,
  args: {
    label: 'Some important label',
    placeholder: 'Type or choose date',
    code: 'date-field'
  }
}

const Template = (args) => <ScDateField {...args} />

export const Default = {
  args: {},
  play: ({ canvasElement, args }) => {
    isSetFocus({ canvasElement, args })
  }
}

export const TopBigLabel = {
  args: {
    labelPlacement: 'top-big'
  },
  play: ({ canvasElement, args }) => {
    isSetFocus({ canvasElement, args })
  }
}

export const StartLabel = {
  args: {
    labelPlacement: 'start'
  },
  play: ({ canvasElement, args }) => {
    isSetFocus({ canvasElement, args })
  }
}

export const EndLabel = {
  args: {
    labelPlacement: 'end'
  },
  play: ({ canvasElement, args }) => {
    isSetFocus({ canvasElement, args })
  }
}

Default.storyName = 'Default label'
TopBigLabel.storyName = 'Top big label'
StartLabel.storyName = 'Start label'
EndLabel.storyName = 'End label'
