import React from 'react'
import ListItem from '@mui/material/ListItem'

const SnowListItem = React.forwardRef(({ children, props }, ref) => {
  return (
    <ListItem ref={ref} {...props}>
      {children}
    </ListItem>
  )
})
export default SnowListItem
