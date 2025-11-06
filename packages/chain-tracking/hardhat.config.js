import {default as chain_config} from '@leverj/lever.chain-deployment/hardhat.config'
import {merge} from 'lodash-es'

const hardhat_root = '../chain-deployment'

export default merge({}, chain_config, {
  paths: {
    sources: `${hardhat_root}/contracts`,
    cache: `${hardhat_root}/cache`,
    artifacts: `${hardhat_root}/artifacts`,
  },
})
