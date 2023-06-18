import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'

const SnowButtonGroup = React.forwardRef(({ children, ...props }, ref) => {
  return <ButtonGroup ref={ref} {...props}>{children}</ButtonGroup>
})

export default SnowButtonGroup
