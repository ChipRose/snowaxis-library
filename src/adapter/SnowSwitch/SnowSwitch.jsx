import React from 'react'
import Switch from '@mui/material/Switch'

const SnowSwitch = React.forwardRef((props, ref) => {
  return <Switch ref={ref} {...props} />
})
export default SnowSwitch
