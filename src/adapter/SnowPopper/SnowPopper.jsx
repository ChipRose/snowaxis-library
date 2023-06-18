import React from 'react'
import Popper from '@mui/material/Popper'

const SnowPopper = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Popper ref={ref} {...props}>
      {children}
    </Popper>
  )
})

export default SnowPopper
