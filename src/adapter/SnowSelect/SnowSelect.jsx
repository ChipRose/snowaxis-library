import React from 'react'
import Select from '@mui/material/Select'

const SnowSelect = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Select ref={ref} {...props}>
      {children}
    </Select>
  )
})

export default SnowSelect
