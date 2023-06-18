import React from 'react'
import Menu from '@mui/material/Menu'

const SnowMenu = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Menu ref={ref} {...props}>
      {children}
    </Menu>
  )
})

export default SnowMenu
