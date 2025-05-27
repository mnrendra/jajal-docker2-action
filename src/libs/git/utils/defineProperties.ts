import setPropertyDescriptor from './setPropertyDescriptor'

const defineProperties = <O, P extends Record<string, any>>(
  object: O,
  properties: P
): void => {
  const keys = Object.keys(properties) as Array<keyof P>
  keys.forEach((key) => {
    const descriptor = setPropertyDescriptor(properties[key])
    Object.defineProperty(object, key, descriptor)
  })
}

export default defineProperties
