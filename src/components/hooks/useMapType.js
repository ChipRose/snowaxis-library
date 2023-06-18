import { useEffect, useState } from 'react'
import { findDuplicationKeysInPairs } from '../../util'

export const useMapType = ({ code, label, onError }) => {
  const [duplicatedKeys, setDuplicatedKeys] = useState([])
  const [newPairIsShown, showNewPair] = useState(false)
  const isValidValue = (value) => {
    const duplicated = findDuplicationKeysInPairs(value)
    setDuplicatedKeys(duplicated)
    return !duplicated.length
  }
  const isInvalidKey = (keyValue) => duplicatedKeys.includes(keyValue)
  const canAddNew = !newPairIsShown
  useEffect(() => {
    const fieldErrors = duplicatedKeys.map((key) => ({
      fieldCode: code,
      issueType: 'duplicated_keys',
      issueValue: key,
      message: `duplicated "${key}" key in ${label}`
    }))
    onError && onError(fieldErrors)
  }, [duplicatedKeys])

  return { canAddNew, showNewPair, isValidValue, isInvalidKey }
}
