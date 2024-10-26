export function sourcifyConfigExtender(
  config,
  userConfig,
) {
  const defaultSourcifyConfig = {
    enabled: false,
    apiUrl: 'https://sourcify.dev/server',
    browserUrl: 'https://repo.sourcify.dev',
  }
  const cloneDeep = require('lodash.clonedeep')
  const userSourcifyConfig = cloneDeep(userConfig.sourcify)
  config.sourcify = {...defaultSourcifyConfig, ...userSourcifyConfig}
}

export function blockscoutConfigExtender(
  config,
  userConfig,
) {
  const defaultBlockscoutConfig = {
    enabled: false,
    customChains: [],
  }
  const cloneDeep = require('lodash.clonedeep')
  const userBlockscoutConfig = cloneDeep(userConfig.blockscout)
  config.blockscout = {...defaultBlockscoutConfig, ...userBlockscoutConfig}
}
