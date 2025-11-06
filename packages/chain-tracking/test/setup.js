import {execSync} from 'node:child_process'

execSync(`npx hardhat compile --config ../chain-deployment/hardhat.config.js`)
