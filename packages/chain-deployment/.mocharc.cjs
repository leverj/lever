process.env.NODE_ENV = 'test'

module.exports = {
  file: 'test/setup.js',
  exit: true,
  timeout: -1,
  'node-option': ['no-warnings=ExperimentalWarning'],
}
