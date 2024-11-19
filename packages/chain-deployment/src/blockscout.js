import axios from 'axios'
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
  return readFileSync(flattened_path, 'utf8')
}

export async function verifyContract(logger, name, chainId, address, libraries) {
  const explorerUrl = blockscoutExplorerUrls[chainId]?.explorers[0].url
  if (!explorerUrl) return logger.warn(`verifying on chain ${chainId} is not supported`)

  const buildInfo = await artifacts.getBuildInfo(contractFullyQualifiedNames[name])
  const {solcLongVersion, input: {settings: {evmVersion, optimizer}}} = buildInfo
  const data = JSON.stringify({
    compiler_version: solcLongVersion,
    license_type: 'mit',
    is_optimization_enabled: optimizer.enabled,
    optimization_runs: optimizer.runs,
    evm_version: evmVersion,
    autodetect_constructor_args: true,
    source_code: getSourceCode(name),
    contract_name: name,
    libraries,
  })
  const url = `${explorerUrl}/api/v2/smart-contracts/${address}/verification/via/flattened-code`
  const headers = {'content-type': 'application/json'}
  await axios.post(url, data, {headers, timeout: 1000}).catch(logger.error)
}
