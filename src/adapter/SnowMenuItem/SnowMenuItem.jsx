import React from 'react'
import MenuItem from '@mui/material/MenuItem'

const SnowMenuItem = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <MenuItem ref={ref} {...props}>
      {children}
    </MenuItem>
  )
})

export default SnowMenuItem
