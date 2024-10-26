import chalk from 'chalk'
import {extendConfig, subtask, task, types} from 'hardhat/config'
import {
  TASK_VERIFY,
  TASK_VERIFY_BLOCKSCOUT,
  TASK_VERIFY_GET_CONTRACT_INFORMATION,
  TASK_VERIFY_GET_VERIFICATION_SUBTASKS,
  TASK_VERIFY_SOURCIFY,
  TASK_VERIFY_VERIFY,
} from './internal/task-names.js'
import {blockscoutConfigExtender, sourcifyConfigExtender} from './internal/config.js'
import {InvalidConstructorArgumentsError, InvalidLibrariesError} from './internal/errors.js'
import {printVerificationErrors} from './internal/utilities.js'
import {extractInferredContractInformation, getLibraryInformation} from './internal/solc/artifacts.js'
import './internal/tasks/sourcify.js'
import './internal/tasks/blockscout.js'


extendConfig(sourcifyConfigExtender)
extendConfig(blockscoutConfigExtender)

/**
 * Main verification task.
 *
 * This is a meta-task that gets all the verification tasks and runs them.
 * It supports Etherscan and Sourcify.
 */
task(TASK_VERIFY, 'Verifies a contract on Etherscan or Sourcify')
  .addOptionalPositionalParam('address', 'Address of the contract to verify')
  .addOptionalVariadicPositionalParam(
    'constructorArgsParams',
    'Contract constructor arguments. Cannot be used if the --constructor-args option is provided',
    [],
  )
  .addOptionalParam(
    'constructorArgs',
    'Path to a Javascript module that exports the constructor arguments',
    undefined,
    types.inputFile,
  )
  .addOptionalParam(
    'libraries',
    'Path to a Javascript module that exports a dictionary of library addresses. ' +
    'Use if there are undetectable library addresses in your contract. ' +
    'Library addresses are undetectable if they are only used in the contract constructor',
    undefined,
    types.inputFile,
  )
  .addOptionalParam(
    'contract',
    'Fully qualified name of the contract to verify. Skips automatic detection of the contract. ' +
    'Use if the deployed bytecode matches more than one contract in your project',
  )
  .addFlag(
    'force',
    'Enforce contract verification even if the contract is already verified. ' +
    'Use to re-verify partially verified contracts on Blockscout',
  )
  .addFlag('listNetworks', 'Print the list of supported networks')
  .setAction(async (taskArgs, {run}) => {
    const verificationSubtasks = await run(
      TASK_VERIFY_GET_VERIFICATION_SUBTASKS,
    )

    const errors = {}
    for (const {label, subtaskName} of verificationSubtasks) {
      try {
        await run(subtaskName, taskArgs)
      } catch (error) {
        errors[label] = error
      }
    }

    const hasErrors = Object.keys(errors).length > 0
    if (hasErrors) {
      printVerificationErrors(errors)
      process.exit(1)
    }
  })

subtask(
  TASK_VERIFY_GET_VERIFICATION_SUBTASKS,
  async (_, {config, userConfig}) => {
    const verificationSubtasks = []

    if (config.sourcify.enabled) {
      verificationSubtasks.push({
        label: 'Sourcify',
        subtaskName: TASK_VERIFY_SOURCIFY,
      })
    }

    if (config.blockscout.enabled) {
      verificationSubtasks.push({
        label: 'Blockscout',
        subtaskName: TASK_VERIFY_BLOCKSCOUT,
      })
    }

    if (
      !config.sourcify.enabled &&
      !config.blockscout.enabled
    ) {
      console.warn(
        chalk.yellow(
          `[WARNING] No verification services are enabled. Please enable at least one verification service in your configuration.`,
        ),
      )
    }

    return verificationSubtasks
  },
)

subtask(TASK_VERIFY_GET_CONTRACT_INFORMATION)
  .addParam('deployedBytecode', undefined, undefined, types.any)
  .addParam('matchingCompilerVersions', undefined, undefined, types.any)
  .addParam('libraries', undefined, undefined, types.any)
  .addOptionalParam('contractFQN')
  .setAction(
    async (
      {
        contractFQN,
        deployedBytecode,
        matchingCompilerVersions,
        libraries,
      },
      {network, artifacts},
    ) => {
      let contractInformation = await extractInferredContractInformation(
        artifacts,
        network,
        matchingCompilerVersions,
        deployedBytecode,
      )

      // map contractInformation libraries
      const libraryInformation = await getLibraryInformation(
        contractInformation,
        libraries,
      )

      return {
        ...contractInformation,
        ...libraryInformation,
      }
    },
  )

/**
 * This subtask is used to programmatically verify a contract on Etherscan or Sourcify.
 */
subtask(TASK_VERIFY_VERIFY)
  .addOptionalParam('address')
  .addOptionalParam('constructorArguments', undefined, [], types.any)
  .addOptionalParam('libraries', undefined, {}, types.any)
  .addOptionalParam('contract')
  .addFlag('force')
  .setAction(
    async (
      {
        address,
        constructorArguments,
        libraries,
        contract,
        force,
      },
      {run, config},
    ) => {
      // This can only happen if the subtask is invoked from within Hardhat by a user script or another task.
      if (!Array.isArray(constructorArguments)) {
        throw new InvalidConstructorArgumentsError()
      }

      if (typeof libraries !== 'object' || Array.isArray(libraries)) {
        throw new InvalidLibrariesError()
      }

      if (config.sourcify.enabled) {
        await run(TASK_VERIFY_SOURCIFY, {
          address,
          libraries,
          contract,
        })
      }
    },
  )
