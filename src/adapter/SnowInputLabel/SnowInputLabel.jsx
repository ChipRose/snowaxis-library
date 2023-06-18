import React from 'react'
import InputLabel from '@mui/material/InputLabel'

const SnowInputLabel = React.forwardRef((props, ref) => {
  return <InputLabel ref={ref} {...props} />
})

export default SnowInputLabel
