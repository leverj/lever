import chalk from 'chalk'
import path from 'path'
import {ImportingModuleError, InvalidLibrariesModuleError} from './errors.js'

/**
 * Prints verification errors to the console.
 * @param errors - An object containing verification errors, where the keys
 * are the names of verification subtasks and the values are HardhatVerifyError
 * objects describing the specific errors.
 * @remarks This function formats and logs the verification errors to the
 * console with a red color using chalk. Each error is displayed along with the
 * name of the verification provider it belongs to.
 * @example
 * const errors: Record<string, HardhatVerifyError> = {
 *   verify:sourcify: { message: 'Error message for Sourcify' },
 *   verify:blockscout: { message: 'Error message for Blockscout' },
 *   // Add more errors here...
 * };
 * printVerificationErrors(errors);
 * // Output:
 * // hardhat-verify found one or more errors during the verification process:
 * //
 * // Sourcify:
 * // Error message for Sourcify
 * //
 * // Blockscout:
 * // Error message for Blockscout
 * //
 * // ... (more errors if present)
 */
export function printVerificationErrors(
  errors,
) {
  let errorMessage = 'hardhat-verify found one or more errors during the verification process:\n\n'
  for (const [subtaskLabel, error] of Object.entries(errors)) {
    errorMessage += `${subtaskLabel}:\n${error.message}\n\n`
  }
  console.error(chalk.red(errorMessage))
}

/**
 * Returns a dictionary of library addresses from the librariesModule or
 * an empty object if not defined.
 */
export async function resolveLibraries(
  librariesModule,
) {
  if (librariesModule === undefined) {
    return {}
  }

  const librariesModulePath = path.resolve(process.cwd(), librariesModule)

  try {
    const libraries = (await import(librariesModulePath)).default

    if (typeof libraries !== 'object' || Array.isArray(libraries)) {
      throw new InvalidLibrariesModuleError(librariesModulePath)
    }

    return libraries
  } catch (error) {
    throw new ImportingModuleError('libraries dictionary', error)
  }
}

/**
 * Retrieves the list of Solidity compiler versions for a given Solidity
 * configuration.
 * It checks that the versions are supported by Etherscan, and throws an
 * error if any are not.
 */
export async function getCompilerVersions({compilers, overrides}) {
  const compilerVersions = compilers.map(({version}) => version)
  if (overrides !== undefined) {
    for (const {version} of Object.values(overrides)) {
      compilerVersions.push(version)
    }
  }
  return compilerVersions
}
