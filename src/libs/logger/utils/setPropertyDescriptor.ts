const setPropertyDescriptor = <T>(
  value: T
): PropertyDescriptor => ({
  /* eslint-disable @typescript-eslint/indent */
  value,
  enumerable: true,
  configurable: false,
  writable: false
})
/* eslint-enable @typescript-eslint/indent */

export default setPropertyDescriptor
