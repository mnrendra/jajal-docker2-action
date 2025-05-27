import isArmored from './isArmored'

const getArmoredKey = (
  key: string
): string => {
  if (isArmored(key)) return key

  const armotedKey = Buffer.from(key, 'base64').toString()

  return armotedKey
}

export default getArmoredKey
