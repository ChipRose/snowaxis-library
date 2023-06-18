import React from 'react'
import InputBase from '@mui/material/InputBase'

const SnowInputBase = React.forwardRef((props, ref) => {
  return <InputBase ref={ref} {...props} />
})

export default SnowInputBase
