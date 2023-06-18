import React from 'react'
import { ScIconButton } from '../../buttons'
import { SnowEditIcon, SnowSaveIcon, SnowDeleteForeverIcon } from '../../../adapter'

export const ScCrudButton = ({
  editMode,
  onEdit,
  onSave,
  onRemove,
  status,
  color,
  size,
  ...props
}) => {
  const saveAllowed = typeof onSave === 'function'
  const saveDisabled = typeof onSave === 'boolean'
  return (
    <>
      {!editMode ? (
        onEdit && (
          <ScIconButton
            color={color}
            className={'ScCrudButton ScCrudButton--edit'}
            aria-label="Edit"
            tooltip={'Edit'}
            size={size}
            onClick={() => onEdit()}
          >
            <SnowEditIcon {...props} />
          </ScIconButton>
        )
      ) : (
        <>
          {saveAllowed ? (
            <ScIconButton
              className={'ScCrudButton ScCrudButton--save'}
              color={color}
              size={size}
              aria-label="Save"
              tooltip={'Save'}
              onClick={() => onSave()}
            >
              <SnowSaveIcon {...props} />
            </ScIconButton>
          ) : (
            saveDisabled && (
              <ScIconButton
                color={color}
                className={'ScCrudButton ScCrudButton--save'}
                aria-label="Save"
                tooltip={'Save'}
                size={size}
                disabled
              >
                <SnowSaveIcon {...props} />
              </ScIconButton>
            )
          )}
          {typeof onRemove === 'function' && (
            <ScIconButton
              color={color}
              className={'ScCrudButton ScCrudButton--remove'}
              aria-label="Remove"
              tooltip={'Remove'}
              size={size}
              onClick={() => onRemove()}
            >
              <SnowDeleteForeverIcon {...props} />
            </ScIconButton>
          )}
        </>
      )}
    </>
  )
}

export default ScCrudButton
