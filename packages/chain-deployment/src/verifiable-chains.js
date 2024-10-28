import {builtinChains} from '@nomicfoundation/hardhat-verify/internal/chain-config.js'

export const verifiableChains = new Set(builtinChains.map(_ => _.chainId))
