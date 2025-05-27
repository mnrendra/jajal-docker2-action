import { cwd } from 'node:process'

interface Store {
  cwd: string
  verbose: boolean
}

export const store: Store = {
  cwd: cwd(),
  verbose: false
}

export const setStore = (
  newStore: Store
): void => {
  Object.keys(newStore).forEach((key) => {
    (store as any)[key] = (newStore as any)[key]
  })
}
