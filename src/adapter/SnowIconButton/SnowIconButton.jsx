import React from 'react'
import IconButton from '@mui/material/IconButton'

const SnowIconButton = React.forwardRef((
  { children = {}, ...props },
  ref
) => {
  return (
    <IconButton ref={ref} {...props}>
      {children}
    </IconButton>
  )
})
export default SnowIconButton
