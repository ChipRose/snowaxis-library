export const filtrateList = ({list, filters}) => {
  const newFilter = Object.keys(filters)?.map((_key) => ({
    key: _key,
    value: filters[_key]
  }))

  const filteredList = list?.filter(
    (item) => {
      let rezult = true
      newFilter?.length && newFilter.map((filter) => (
        rezult =
          rezult &&
          (filter?.value
            ? String(item?.[filter.key])?.toLowerCase()
                .includes(filters[filter?.key]?.toLowerCase())
            : true)
      ))
      return rezult
    }
  )
  return filteredList
}