import React, { useState } from 'react'

import { argTypes } from './argTypes'
import { getContent } from '../../../../mocks'
import { ScConfirmationAlert } from '../ScConfirmationAlert'
import { ScPrimaryBtn } from '../../../buttons'
import { useEffect } from 'react'

export default {
  title: 'MODALS/ScConfirmationAlert/Loading',
  component: ScConfirmationAlert,
  argTypes,
  args: {},
  parameters: {
    docs: {
      iframeHeight: 500
    }
  }
}

const Template = (args) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000);
    return () => clearTimeout(timer);
  },[open])

  return (
    <>
      <ScPrimaryBtn
        onClick={() =>{ 
          setOpen(!open)
          setLoading(true)
        }}
        label={'Click to modal window'}
      />
      <ScConfirmationAlert
        {...args}
        open={open}
        loading={loading}
        onClose={() => setOpen(!open)}
      />
    </>
  )
}

export const LoadingData = Template.bind({})
LoadingData.args = {
  message: getContent('editable-row'),
}

LoadingData.storyName = 'Loading data'

