import { store } from '../store'

import chalk from './chalk'

const success = (
  message: string
): void => {
  if (store.verbose) {
    const green = '\u001B[32m'

    console.log(chalk(message, green))
  }
}

export default success
