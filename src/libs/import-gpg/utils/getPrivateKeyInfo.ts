import { type PrivateKeyInfo, readPrivateKey } from '../libs/openpgp'

import { log } from '../../../libs/logger'

const getPrivateKeyInfo = async (
  privateKey: string
): Promise<PrivateKeyInfo> => {
  const {
    digest,
    id,
    name,
    email,
    creationTime
  } = await readPrivateKey(privateKey)

  log('---------------- GPG private key info ----------------------------')
  log(`Fingerprint     : ${digest}`)
  log(`KeyID           : ${id}`)
  log(`Name            : ${name}`)
  log(`Email           : ${email}`)
  log(`CreationTime    : ${creationTime.toUTCString()}`)

  return {
    digest,
    id,
    name,
    email,
    creationTime
  }
}

export default getPrivateKeyInfo
