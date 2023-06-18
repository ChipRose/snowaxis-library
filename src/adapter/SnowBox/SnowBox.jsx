import React from 'react'
import Box from '@mui/material/Box'

const SnowBox = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  )
})

export default SnowBox
