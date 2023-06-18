import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState
} from 'recoil'

const updatedScFieldsIds = atom({
  key: 'updatedScFieldsIds',
  default: []
})

//store the {[uid]:value} pair for updated ScEditableField
const updatedScFieldValueAtom = atomFamily({
  key: 'updatedScFieldValueAtom',
  default: (code) => null
})

//store the {[uid]:props&state} pair for updated ScEditableField
const updatedScFieldFullAtom = atomFamily({
  key: 'updatedScFieldFullAtom',
  default: (uid) => null
})

//return props&state pair for given uid among updated fields
export const useScFieldState = (uid) => {
  const [fieldState, setFieldState] = useRecoilState(
    updatedScFieldFullAtom(uid)
  )
  const handleSetFieldState = (state) => {
    console.log(`useScFieldState code = ${uid} handleSetFieldState`, state)
    setFieldState(state)
  }
  const resetFieldState = useResetRecoilState(updatedScFieldFullAtom(uid))

  return [fieldState, handleSetFieldState, resetFieldState]
}

const updatedScFieldErrorAtom = atomFamily({
  key: 'updatedScFieldErrorAtom',
  default: (code) => []
})

const updatedScFieldErrorsIds = atom({
  key: 'updatedScFieldErrorsIds',
  default: []
})

//used in SnowEditableField.js to store its updated value, also updates list of updated fields
export const updatedScFieldValue = selectorFamily({
  key: 'updatedScFieldValue',
  get:
    (uid) =>
    ({ get }) => {
      return get(updatedScFieldValueAtom(uid))
    },
  set:
    (uid) =>
    ({ get, set, reset }, newValue) => {
      console.log('attempt to set updatedFieldsValue', uid, newValue)

      if (newValue instanceof DefaultValue) {
        // DefaultValue means reset context
        console.log('going to reset updated values')
        reset(updatedScFieldValueAtom(uid))
        return
      }
      set(updatedScFieldValueAtom(uid), newValue)
      set(updatedScFieldsIds, (prev) => [...new Set([...prev, uid])])
    }
})

export const updatedScFieldsArray = selector({
  key: 'updatedScFieldsArray',
  get: ({ get }) => {
    const ids = get(updatedScFieldsIds)
    return ids.map((id) => ({
      [`${id}`]: get(updatedScFieldValueAtom(id))
    }))
  },
  set: ({ set, get, reset }, newValues) => {
    console.log('updatedScFieldsArray set', newValues)

    if (newValues instanceof DefaultValue) {
      const ids = get(updatedScFieldsIds)
      console.log('updatedScFieldsArray reset', ids)
      ids.map((id) => reset(updatedScFieldValueAtom(id)))
      set(updatedScFieldsIds, [])
    }
  }
})

export const updatedScFieldError = selectorFamily({
  key: 'updatedScFieldError',
  get:
    (code) =>
    ({ get }) => {
      return get(updatedScFieldErrorAtom(code))
    },
  set:
    (code) =>
    ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        // DefaultValue means reset context
        // console.log('going to reset errors values')
        reset(updatedScFieldErrorAtom(code))
        reset(updatedScFieldErrorsIds)
        return
      }
      console.log('attempt to set updatedScFieldError', newValue)

      set(updatedScFieldErrorAtom(code), newValue)
      set(updatedScFieldErrorsIds, (prev) => [...new Set([...prev, code])])
    }
})

export const updatedScFieldsErrorsArray = selector({
  key: 'updatedScFieldsErrorsArray',
  get: ({ get }) => {
    const ids = get(updatedScFieldErrorsIds)
    return ids.map((id) => ({
      [`${id}`]: get(updatedScFieldErrorAtom(id))
    }))
  }
})
