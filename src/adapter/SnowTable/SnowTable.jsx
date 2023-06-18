import React from 'react'
import Table from '@mui/material/Table'

const SnowTable = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Table ref={ref} {...props}>
      {children}
    </Table>
  )
})

export default SnowTable
