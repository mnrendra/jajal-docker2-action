import generateKeyPair from './generateKeyPair'
import getArmoredKey from './getArmoredKey'
import isArmored from './isArmored'
import readPrivateKey, { type PrivateKeyInfo } from './readPrivateKey'

export type {
  PrivateKeyInfo
}

export {
  generateKeyPair,
  getArmoredKey,
  isArmored,
  readPrivateKey
}

export default {
  generateKeyPair,
  getArmoredKey,
  isArmored,
  readPrivateKey
}
