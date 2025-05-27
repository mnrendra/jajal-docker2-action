import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const updateActionVersion = (
  actionFile: string,
  version: string
): void => {
  if (!existsSync(actionFile)) return

  const actionContent = readFileSync(actionFile, 'utf8')

  const lines = actionContent.split(/\r?\n/)
  const versionRegex = /^(\s*)version\s*:\s*([^\s#]+)(\s*)(#.*)?$/
  const nameRegex = /^(\s*)name\s*:\s*(.+)$/

  let hasVersion = false
  let nameIndex = -1

  for (let i = 0; i < lines.length; i++) {
    const versionMatch = lines[i].match(versionRegex)

    if (versionMatch !== null && versionMatch !== undefined) {
      const [, indent,, space, comment] = versionMatch
      const hasSpace = typeof space === 'string' && space !== ''
      const hasComment = typeof comment === 'string' && comment !== ''
      lines[i] = `${indent}version: ${version}${hasSpace ? space : ' '}${hasComment ? comment : ''}`
      hasVersion = true
      break
    }

    const nameMatch = lines[i].match(nameRegex)

    if (nameMatch !== null && nameMatch !== undefined) {
      nameIndex = i
    }
  }

  if (!hasVersion) {
    const newLine = `version: ${version}`

    if (nameIndex >= 0) {
      lines.splice(nameIndex + 1, 0, newLine)
    } else {
      lines.unshift(newLine)
    }
  }

  const updatedAction = lines.join('\n')

  rmSync(actionFile, { force: true })
  writeFileSync(actionFile, updatedAction, 'utf8')
}

export default updateActionVersion
