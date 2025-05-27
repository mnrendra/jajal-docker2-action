export const GPG_AGENT_CONF_FILE = 'gpg-agent.conf'

export const GNUPG_EXT = '.gnupg'

export const PLATFORM = {
  WIN32: 'win32'
} as const

export const GPG_AGENT_CONF = '' +
'default-cache-ttl 21600\n' +
'max-cache-ttl 31536000\n' +
'allow-preset-passphrase\n'
