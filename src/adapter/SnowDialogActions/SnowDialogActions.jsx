import React from 'react'
import DialogActions from '@mui/material/DialogActions'

const SnowDialogActions = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <DialogActions ref={ref} {...props}>
      {children}
    </DialogActions>
  )
})

export default SnowDialogActions
