import { argv } from 'node:process'

const main = async (): Promise<string> => {
  const [
    version,
    branch
  ] = argv.slice(2)

  if (
    typeof version !== 'string' ||
    version === '' ||
    typeof branch !== 'string' ||
    branch === ''
  ) {
    return branch
  }

  return branch
}

export default main
