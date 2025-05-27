import { store } from '../store'

import chalk from './chalk'

const warn = (
  message: string
): void => {
  if (store.verbose) {
    const yellow = '\u001B[33m'

    console.log(chalk('WARNING:', yellow))
    console.log(chalk(message, yellow))
  }
}

export default warn
