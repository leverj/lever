import {execSync} from 'node:child_process'

execSync('curl https://raw.githubusercontent.com/blockscout/chainscout/main/data/chains.json -o ../src/chainscout-chains.json')
