import React from 'react'
import Grid from '@mui/material/Grid'

const SnowGrid = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Grid ref={ref} {...props}>
      {children}
    </Grid>
  )
})

export default SnowGrid
