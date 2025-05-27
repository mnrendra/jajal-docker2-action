import { store } from '../store'

const info = (
  message: string
): void => {
  if (store.verbose) {
    console.log(message)
  }
}

export default info
