export const schema = {
  env: {
    doc: 'The application environment',
    format: ['livenet', 'production', 'develop', 'dev', 'e2e', 'test'],
    default: 'livenet',
    env: 'NODE_ENV',
  },
  deploymentDir: {
    doc: 'will output the .evms.json file under `${deploymentDir}/${env}',
    format: String,
    default: `${process.env.PWD}/data/chain`,
    env: 'DEPLOYMENT_DIR',
  },
  deployer: {
    privateKey: {
      format: '*',
      default: null,
      nullable: false,
      sensitive: true,
      env: 'DEPLOYER_PRIVATE_KEY',
    },
  },
}

export function postLoad(config) {
  config.networks = {}
  config.constructors = {}
  config.createContractsConstructors = (chain) => ({})
  config.setContractsConstructors = function (chain) { this.constructors[chain] = this.createContractsConstructors(chain) }
  return config
}
