import React from 'react'
import { TableBody } from '@mui/material'

const SnowTableBody = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <TableBody {...props} ref={ref}>
      {children}
    </TableBody>
  )
})

export default SnowTableBody
