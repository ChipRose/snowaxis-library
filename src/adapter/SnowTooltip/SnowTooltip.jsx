import React from 'react'
import Tooltip from '@mui/material/Tooltip'

const SnowTooltip = React.forwardRef((props, ref) => {
  return <Tooltip ref={ref} {...props} />
})

export default SnowTooltip
