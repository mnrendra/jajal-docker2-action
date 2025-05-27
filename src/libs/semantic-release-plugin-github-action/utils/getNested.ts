const getNested = <O extends Record<string, any>>(
  object: O,
  path: string
): any => {
  const keys = path.split('.')
  const value = keys.reduce((acc, key) => acc?.[key], object)
  return value
}

export default getNested
