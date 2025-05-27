import { log } from '../../../libs/logger'

const printFingerprint = (
  digest: string,
  fingerprint?: string
): void => {
  log('---------------- Fingerprint to use ------------------------------')
  log(fingerprint ?? digest)
}

export default printFingerprint
