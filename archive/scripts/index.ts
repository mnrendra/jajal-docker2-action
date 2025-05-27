#!/usr/bin/env node

import main from './main'

main()
  .then((result) => {
    console.log('result:', result)
  })
  .catch((error) => {
    if (error instanceof Error) throw error
    throw new Error('Unknown error')
  })
