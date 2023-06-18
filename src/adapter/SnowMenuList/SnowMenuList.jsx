import React from 'react'
import MenuList from '@mui/material/MenuList'

const SnowMenuList = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <MenuList ref={ref} {...props}>
      {children}
    </MenuList>
  )
})

export default SnowMenuList
