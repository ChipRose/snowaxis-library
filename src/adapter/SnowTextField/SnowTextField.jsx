import React from 'react'
import TextField from '@mui/material/TextField'

const SnowTextField = React.forwardRef((props, ref) => {
  return <TextField ref={ref} {...props} />
})

export default SnowTextField
