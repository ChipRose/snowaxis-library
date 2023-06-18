import React from 'react'
import Fab from '@mui/material/Fab'

const SnowFab = React.forwardRef(({ children, ...props }, ref) => {
  return <Fab ref={ref} {...props}>{children}</Fab>
})

export default SnowFab
