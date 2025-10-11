import {execSync} from 'node:child_process'

process.env.HARDHAT_ROOT = `${import.meta.dirname}/../../chain-deployment`
execSync(`npx hardhat compile --config ${process.env.HARDHAT_ROOT}/hardhat.config.js`)
