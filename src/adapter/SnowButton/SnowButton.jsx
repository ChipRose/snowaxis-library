import React from 'react'
import Button from '@mui/material/Button'

const SnowButton = React.forwardRef((
  { children, ...props },
  ref
) => {
  return (
    <Button ref={ref} {...props}>
      {children}
    </Button>
  )
})

export default SnowButton
