import React from 'react'
import Avatar from '@mui/material/Avatar'

const SnowAvatar = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Avatar ref={ref} {...props}>
      {children}
    </Avatar>
  )
})

export default SnowAvatar
