import React from 'react'
import { withRecoilFlow } from 'storybook-addon-recoil-flow/dist/decorator'

import { argTypes } from './argTypes'
import { ScGeneralField } from '../ScGeneralField'

export default {
  title: 'EDITABLE FIELDS/Base field/ScGeneralField/Settings',
  component: ScGeneralField,
  argTypes,
  decorators: [withRecoilFlow],
  args: {
    code: 'general-field',

  }
}

const Template = (args) => <ScGeneralField {...args} />

export const Default = Template.bind({})
Default.args = {
}

Default.storyName = 'Default state'
