import React from 'react'
import Checkbox from '@mui/material/Checkbox'

const SnowCheckbox = React.forwardRef((props, ref) => {
  return <Checkbox ref={ref} {...props} />
})

export default SnowCheckbox
