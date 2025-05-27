#!/usr/bin/env node

import main from './main'

main()
  .then((result) => {
    console.log('hasil:', result)
  })
  .catch((error) => {
    if (error instanceof Error) throw error
    throw new Error('Unknown error')
  })
