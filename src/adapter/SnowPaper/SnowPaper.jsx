import React from 'react'
import Paper from '@mui/material/Paper'

const SnowPaper = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Paper ref={ref} {...props}>
      {children}
    </Paper>
  )
})

export default SnowPaper
