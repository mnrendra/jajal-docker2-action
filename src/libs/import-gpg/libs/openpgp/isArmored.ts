const isArmored = (
  key: string
): boolean => {
  return key.trimStart().startsWith('---')
}

export default isArmored
