import React from 'react'
import Dialog from '@mui/material/Dialog'

const SnowDialog = React.forwardRef(
  (
    {
      children,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      ...props
    },
    ref
  ) => {
    return (
      <Dialog
        ref={ref}
        TransitionProps={{
          onEnter,
          onEntered,
          onEntering,
          onExit,
          onExited,
          onExiting
        }}
        {...props}
      >
        {children}
      </Dialog>
    )
  }
)

export default SnowDialog
