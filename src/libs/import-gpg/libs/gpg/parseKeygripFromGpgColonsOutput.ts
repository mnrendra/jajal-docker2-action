const parseKeygripFromGpgColonsOutput = (
  stdoutLines: string[],
  fingerprint: string
): string => {
  let keygrip = ''
  let fingerPrintFound = false

  for (const line of stdoutLines) {
    if (line.startsWith('fpr:') && line.includes(`:${fingerprint}:`)) {
      fingerPrintFound = true
      continue
    }

    if (line.startsWith('grp:') && fingerPrintFound) {
      keygrip = line.replace(/(grp|:)/g, '').trim()
      break
    }
  }

  return keygrip
}

export default parseKeygripFromGpgColonsOutput
