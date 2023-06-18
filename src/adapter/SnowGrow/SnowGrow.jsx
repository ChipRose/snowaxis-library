import React from 'react'
import Grow from '@mui/material/Grow'

const SnowGrow = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Grow ref={ref} {...props}>
      {children}
    </Grow>
  )
})

export default SnowGrow
