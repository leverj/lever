import {Deploy} from '@leverj/lever.chain-deployment'
import {logger} from '@leverj/lever.common'
import {execSync} from 'node:child_process'
import {hideBin} from 'yargs/helpers'
import yargs from 'yargs/yargs'
import config from '../config.js'

execSync('npx hardhat compile')
const {reset, chain} = yargs(hideBin(process.argv)).
usage('Usage: $0 --reset --chain=[chain]').
demandOption(['chain'], 'must have a target chain to deploy to').
  argv
const deploy = Deploy.from(config)
await deploy.to(chain, {reset}).catch(logger.error)
