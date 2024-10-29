import * as glob from 'glob'
import {default as hardhat} from 'hardhat'
import {Map} from 'immutable'
import {execSync} from 'node:child_process'
import {readFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
/*** from https://github.com/blockscout/chainscout/blob/main/data/chains.json ***/
import blockscoutExplorerUrls from './chainscout-chains.json' assert {type: 'json'}

const {artifacts, config: {paths}} = hardhat
const contractFullyQualifiedNames = Map((await artifacts.getAllFullyQualifiedNames()).map(_ => [_.split(':')[1], _])).toJS()

async function getBuildInfo(name) {
  return artifacts.getBuildInfo(contractFullyQualifiedNames[name])
}

function getSourceCode(name) {
  const sources = glob.sync(`${paths.sources}/**/*.sol`)
  const source_path = sources.find(_ => _.endsWith(`/${name}.sol`))
  const flattened_path = `${tmpdir()}/${name}.sol`
  execSync(`npx hardhat flatten ${source_path} | awk '/SPDX-License-Identifier/&&c++>0 {next} 1' > ${flattened_path}`)
  return readFileSync(flattened_path, 'utf8')
}

export async function verifyContract(logger, name, chainId, address, libraries) {
  const explorerUrl = blockscoutExplorerUrls[chainId]?.explorers[0].url
  if (!explorerUrl) return logger.warn(`verifying on chain ${chainId} is not supported`)

  const {solcLongVersion, input: {settings: {evmVersion, optimizer}}} = await getBuildInfo(name)
  const body = JSON.stringify({
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

  try {
    const response = await fetch(`${explorerUrl}/api/v2/smart-contracts/${address}/verification/via/flattened-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    const data = await response.json()
    if (response.status === 200) logger.log(`[${data.message}] see: ${explorerUrl}/address/${address}?tab=contract`)
    else throw Error(`${explorerUrl} : failed to verify ${name} @ ${address} ; [${response.status}] ${data.message}`)
  } catch (e) {
    logger.error(e)
  }
}
