export default (search = window.location.search) => {
  const searchParams = new URLSearchParams(search)
  const params = {}
  Array.from(searchParams).forEach(([key, value]) => {
    params[key] = value
  })
  return params
}
