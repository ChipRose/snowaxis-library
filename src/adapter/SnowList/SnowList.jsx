import React from 'react'
import List from '@mui/material/List'

const SnowList = React.forwardRef(({ children, props }, ref) => {
  return (
    <List ref={ref} {...props}>
      {children}
    </List>
  )
})

export default SnowList
