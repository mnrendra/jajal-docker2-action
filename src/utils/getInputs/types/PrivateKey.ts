import type ImportGPG from './ImportGPG'

type PrivateKey = Parameters<ImportGPG>[0] | undefined

export default PrivateKey
