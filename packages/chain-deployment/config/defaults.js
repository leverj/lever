import info from '../package.json' assert {type: 'json'}
import {wallets} from '@leverj/chain-deployment/hardhat.help'
import {last} from 'lodash-es'

export const dataDir = `${import.meta.dirname}/../../../data`
export const packageName = last(info.name.split('/'))

export const defaults = {
  deployer: {
    privateKey: wallets[0].privateKey,
  },
  deploymentDir: `${dataDir}/${packageName}`,
}
