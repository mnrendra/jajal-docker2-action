import gpgConnectAgent from './gpgConnectAgent'

const killAgent = async (): Promise<void> => {
  await gpgConnectAgent('KILLAGENT')
}

export default killAgent
