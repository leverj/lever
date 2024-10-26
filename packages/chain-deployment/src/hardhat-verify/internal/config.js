import chalk from 'chalk'

export function etherscanConfigExtender(
  config,
  userConfig,
) {
  const defaultEtherscanConfig = {
    apiKey: '',
    customChains: [],
    enabled: true,
  }
  const cloneDeep = require('lodash.clonedeep')
  const userEtherscanConfig = cloneDeep(userConfig.etherscan)
  config.etherscan = {...defaultEtherscanConfig, ...userEtherscanConfig}

  // check that there is no etherscan entry in the networks object, since
  // this is a common mistake made by users
  if (
    userConfig.etherscan === undefined &&
    config.networks?.etherscan !== undefined
  ) {
    console.warn(
      chalk.yellow(
        'WARNING: you have an \'etherscan\' entry in your networks configuration. This is likely a mistake. The etherscan configuration should be at the root of the configuration, not within the networks object.',
      ),
    )
  }
}

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
