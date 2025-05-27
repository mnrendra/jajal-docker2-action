const parseIgnore = (
  ignore: string
): string[] => {
  const lines = new Set<string>()

  for (const rawLine of ignore.split(/\r?\n/)) {
    const line = rawLine.split('#')[0].trim()

    if (typeof line === 'string' && line !== '') {
      lines.add(line)
    }
  }

  return Array.from(lines)
}

export default parseIgnore
