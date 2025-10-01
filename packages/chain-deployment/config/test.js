import info from '../package.json' with {type: 'json'}
import {wallets} from '../test/network-connect.js'
import {last} from 'lodash-es'

export const dataDir = `${import.meta.dirname}/../../../data`
export const packageName = last(last(info.name.split('/')).split('.'))

export default {
  deployer: {
    privateKey: wallets[0].privateKey,
  },
  deploymentDir: `${dataDir}/${packageName}`,
}

