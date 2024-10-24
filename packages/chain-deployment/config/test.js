import info from '../package.json' assert {type: 'json'}
import {wallets} from '@leverj/lever.chain-deployment/hardhat.help'
import {last} from 'lodash-es'

export const dataDir = `${import.meta.dirname}/../../../data`
export const packageName = last(last(info.name.split('/')).split('.'))

export default {
  deployer: {
    privateKey: wallets[0].privateKey,
  },
  deploymentDir: `${dataDir}/${packageName}`,
}

