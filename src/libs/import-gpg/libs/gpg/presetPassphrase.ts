import gpgConnectAgent from './gpgConnectAgent'

const presetPassphrase = async (
  keygrip: string,
  passphrase: string
): Promise<string> => {
  const hexPassphrase = Buffer.from(passphrase, 'utf8').toString('hex').toUpperCase()

  await gpgConnectAgent(`PRESET_PASSPHRASE ${keygrip} -1 ${hexPassphrase}`)

  const keyinfo = await gpgConnectAgent(`KEYINFO ${keygrip}`)

  return keyinfo
}

export default presetPassphrase
