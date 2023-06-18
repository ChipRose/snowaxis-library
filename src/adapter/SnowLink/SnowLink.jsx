import React from 'react'
import Link from '@mui/material/Link'

const SnowLink = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Link ref={ref} {...props}>
      {children}
    </Link>
  )
})

export default SnowLink
