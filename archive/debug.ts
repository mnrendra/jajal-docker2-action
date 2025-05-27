import { store } from '../store'

import chalk from './chalk'

const debug = (
  message: string
): void => {
  if (store.verbose) {
    const grey = '\u001B[90m'

    console.log(chalk(message, grey))
  }
}

export default debug
