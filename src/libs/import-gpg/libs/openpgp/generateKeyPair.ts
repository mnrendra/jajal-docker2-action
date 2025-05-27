import { generateKey } from 'openpgp'

import normalizeKey from './normalizeKey'

interface KeyPair {
  publicKey: string
  privateKey: string
}

type KeyType =
| 'ecc'
| 'rsa'
| 'curve25519'
| 'curve448'

export const generateKeyPair = async (
  name: string,
  email: string,
  passphrase: string,
  type?: KeyType
): Promise<KeyPair> => {
  const userIDs = [{ name, email }]

  const {
    publicKey,
    privateKey
  } = await generateKey({
    userIDs,
    passphrase,
    type
  })

  return {
    publicKey: normalizeKey(publicKey),
    privateKey: normalizeKey(privateKey)
  }
}

export default generateKeyPair
