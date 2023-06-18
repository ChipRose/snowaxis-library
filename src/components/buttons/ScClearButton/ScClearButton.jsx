import React from 'react'
import { SnowClearIcon } from '../../../adapter'
import { ScIconButton } from '../../buttons'

const ScClearButton = ({ onClear }) => {
  return (
    <ScIconButton aria-label="Remove" onClick={() => onClear()} size={40}>
      <SnowClearIcon />
    </ScIconButton>
  )
}

export default ScClearButton
