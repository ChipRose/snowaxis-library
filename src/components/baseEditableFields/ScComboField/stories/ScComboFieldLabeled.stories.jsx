import { argTypes } from './argTypes'
import { getOptions } from '../../../../mocks'
import { ScComboField } from '../ScComboField'

import { isSetFocus } from '../../../../util'

export default {
  title: 'EDITABLE FIELDS/Base field/ScComboField/Labeled',
  component: ScComboField,
  argTypes,
  args: {
    placeholder: 'Type or choose some options',
    label: 'Some important label',
    code: 'combo-field',
    meta: { options: getOptions() }
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

Default.storyName = 'Default label'
