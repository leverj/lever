import {verifyContract} from '@nomicfoundation/hardhat-verify/verify'
import hre, {artifacts, config} from 'hardhat'
import {Map} from 'immutable'
import {execSync} from 'node:child_process'
import {tmpdir} from 'node:os'

const fullyQualifiedNames = Map(Array.from(await artifacts.getAllFullyQualifiedNames()).map(_ => [_.split(':')[1], _])).toJS()

export async function verify(name, constructorArgs, libraries, network, logger) {
  const address = network.contracts[name].address
  try {
    await verifyContract(
      {
        address,
        constructorArgs,
        libraries,
        contract: fullyQualifiedNames[name],
        provider: 'blockscout',
      },
      hre
    )
  } catch (e) {
    const {
      solcLongVersion,
      input: {
        settings: {
          evmVersion,
          optimizer,
        }
      }
    } = await getBuildInfo(name)
    logger.warn(`verifying on chain ${network.chain} [${network.id}] is not supported`)
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
    logger.log('Solidity Contract Code (read from file):', await flattenContractSource(name))
    logger.log('Libraries:', libraries)
    logger.warn('-'.repeat(120))
  }
}

const getBuildInfo = async (name) => artifacts.getBuildInfoId(name).
  then(_ => artifacts.getBuildInfoPath(_)).
  then(_ => import(_, {with: {type: 'json'}})).
  then(_ => _.default)

const flattenContractSource = async (name) => artifacts.readArtifact(name).
  then(_ => {
    const source_path = _.inputSourceName.replace('project', config.paths.root)
    const flattened_path = `${tmpdir()}/${name}.sol`
    execSync(`npx hardhat flatten ${source_path} | awk '/SPDX-License-Identifier/&&c++>0 {next} 1' > ${flattened_path}`)
    return flattened_path
  })
