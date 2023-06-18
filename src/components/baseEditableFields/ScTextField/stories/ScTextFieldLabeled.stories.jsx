import { argTypes } from './argTypes'
import { ScTextField } from '../ScTextField'

import { isSetFocus } from '../../../../util/'

export default {
  title: 'EDITABLE FIELDS/Base field/ScTextField/Labeled',
  component: ScTextField,
  argTypes: argTypes,
  args: {
    label: 'Some important label',
    code: 'text-field'
  }
}

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
