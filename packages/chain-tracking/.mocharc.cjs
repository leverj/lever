process.env.NODE_ENV = 'test'
process.env.DOTENV_CONFIG_QUIET = true

module.exports = {
  file: 'test/setup.js',
  exit: true,
  timeout: -1,
  'node-option': ['no-warnings=ExperimentalWarning'],
}
