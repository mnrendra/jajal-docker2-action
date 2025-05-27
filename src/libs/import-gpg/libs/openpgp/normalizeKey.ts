const normalizeKey = (
  key: string
): string => {
  return key.replace(/\r\n/g, '\n').trim()
}

export default normalizeKey
