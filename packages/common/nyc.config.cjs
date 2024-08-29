module.exports = {
  include: ['src/*'],
  exclude: [
    'src/utils/errors.js',
    'src/utils/logger.js',
    'src/utils/telegram.js',
  ],
  reporter: ['text', 'html', 'json']
}
