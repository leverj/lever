import {getCreationTransaction} from '@leverj/lever.common'
import axios from 'axios'
import {JsonRpcProvider} from 'ethers'
import * as glob from 'glob'
import {default as hardhat} from 'hardhat'
import {Map} from 'immutable'
import {execSync} from 'node:child_process'
import {readFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
/*** from https://github.com/blockscout/chainscout/blob/main/data/chains.json ***/
import blockscoutExplorerUrls from './chainscout-chains.json' with {type: 'json'}

const {artifacts, config: {paths}} = hardhat
const contractFullyQualifiedNames = Map((await artifacts.getAllFullyQualifiedNames()).map(_ => [_.split(':')[1], _])).toJS()

const getSourceCode = (name) => {
  const sources = glob.sync(`${paths.sources}/**/*.sol`)
  const source_path = sources.find(_ => _.endsWith(`/${name}.sol`))
  const flattened_path = `${tmpdir()}/${name}.sol`
  execSync(`npx hardhat flatten ${source_path} | awk '/SPDX-License-Identifier/&&c++>0 {next} 1' > ${flattened_path}`)
  return flattened_path
}

export async function verifyContract(logger, network, name, libraries) {
  const chainId = parseInt(network.id)
  const {address, blockCreated} = network.contracts[name]
  const flattenedSourcePath = getSourceCode(name)
  const buildInfo = await artifacts.getBuildInfo(contractFullyQualifiedNames[name])
  const {solcLongVersion, input: {settings: {evmVersion, optimizer}}} = buildInfo
  const explorerUrl = blockscoutExplorerUrls[chainId]?.explorers[0].url
  if (explorerUrl) {
    const url = `${explorerUrl}/api/v2/smart-contracts/${address}/verification/via/flattened-code`
    const data = {
      compiler_version: solcLongVersion,
      license_type: 'mit',
      is_optimization_enabled: optimizer.enabled,
      optimization_runs: optimizer.runs,
      evm_version: evmVersion,
      autodetect_constructor_args: true,
      source_code: readFileSync(flattenedSourcePath, 'utf8'),
      contract_name: name,
      libraries,
    }
    const headers = {'content-type': 'application/json'}
    const response = await axios.post(url, JSON.stringify(data), {headers, timeout: 1000}).catch(logger.error)
    logger.log(`${response.statusText}: ${response.data.message}`)
  } else {
    const artifact = await artifacts.readArtifactSync(contractFullyQualifiedNames[name])
    const provider = new JsonRpcProvider(network.providerURL)
    const deploymentTransaction = await getCreationTransaction(provider, blockCreated, address)
    const constructorArgs = deploymentTransaction ?
      deploymentTransaction.data.slice(artifact.bytecode.length) : // constructor args are attached at the END of the input created bytecode
      'Unknown'
    logger.warn(`verifying on chain ${chainId} is not supported`)
    logger.warn(`instead, try verifying manually using the following data:`)
    logger.warn('-'.repeat(120))
    logger.log('Contract Name:', name)
    logger.log('Contract Address:', address)
    logger.log('Compiler Type:', 'Solidity (Single File)')
    logger.log('License Type:', 'MIT License (MIT)')
    logger.log('Compiler Version:', solcLongVersion)
    logger.log('Optimization:', optimizer.enabled)
    logger.log('Runs (Optimizer):', optimizer.runs)
    logger.log('EVM Version to target:', evmVersion)
    logger.log('Constructor Arguments:', constructorArgs)
    logger.log('Solidity Contract Code (read from file):', flattenedSourcePath)
    logger.log('Libraries:', libraries)
    logger.warn('-'.repeat(120))
  }
}
