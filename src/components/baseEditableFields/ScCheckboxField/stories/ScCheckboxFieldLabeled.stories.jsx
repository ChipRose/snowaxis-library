import { argTypes } from './argTypes'
import { ScCheckboxField } from '../ScCheckboxField'

import { isSetFocus } from '../../../../util'

export default {
  title: 'EDITABLE FIELDS/Base field/ScCheckboxField/Labeled',
  component: ScCheckboxField,
  argTypes: argTypes,
  args: {
    label: 'Some important label',
    code: 'checkbox-field'
  }
}

export const Default = {
  args: {},
  play: ({ canvasElement, args }) => {
    isSetFocus({ canvasElement, args })
  }
}

export const TopLabel = {
  args: {
    labelPlacement: 'top'
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
TopLabel.storyName = 'Top label'
EndLabel.storyName = 'End label'
