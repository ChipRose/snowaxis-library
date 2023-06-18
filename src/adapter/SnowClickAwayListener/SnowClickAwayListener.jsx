import React from 'react'
import { ClickAwayListener } from '@mui/material'

const SnowClickAwayListener = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <ClickAwayListener ref={ref} {...props}>
        {children}
      </ClickAwayListener>
    )
  }
)
export default SnowClickAwayListener
