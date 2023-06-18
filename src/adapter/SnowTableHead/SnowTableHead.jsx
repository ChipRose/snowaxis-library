import React from 'react'
import TableHead from '@mui/material/TableHead'

const SnowTableHead = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <TableHead {...props} ref={ref}>
      {children}
    </TableHead>
  )
})

export default SnowTableHead
