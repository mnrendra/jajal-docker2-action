import { readKey } from 'openpgp'
import addressparser from 'addressparser'

import defaultModule from '../../../../libs/default-module'

import getArmoredKey from './getArmoredKey'

export interface PrivateKeyInfo {
  digest: string
  id: string
  name: string
  email: string
  creationTime: Date
}

const readPrivateKey = async (
  privateKey: string
): Promise<PrivateKeyInfo> => {
  const armoredKey = getArmoredKey(privateKey)

  const key = await readKey({ armoredKey })

  const { user } = await key.getPrimaryUser()

  const digest = key.getFingerprint().toUpperCase()

  const id = key.getKeyID().toHex().toUpperCase()

  const parser = defaultModule(addressparser)

  const { name, address: email } = parser(user.userID?.userID ?? '')[0]

  const creationTime = key.getCreationTime()

  return {
    digest,
    id,
    name,
    email,
    creationTime
  }
}

export default readPrivateKey
