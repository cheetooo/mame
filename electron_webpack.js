const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV == 'development' ? 'development' : 'production',
  entry: {
    main: './electron'
  },
  output: {
    path: path.resolve(__dirname, './output'),
    filename: '[name].js'
  },
  target: 'electron-main',
  node: {
    __dirname: false
  }
}
