const path = require('path')
/**
 * Q：为什么要单独写这个 webpack 配置文件？
 * A：electron开发时存在两个进程 main 和 renderer
 * renderer 在开发时使用 create-react-app 也就是 webpack-dev-server 所生成的文件 （localhost：xxxx）打包之后为静态文件
 * main 在官方文档里指出只要在 package.json 中的 main 字段写上对应的文件即可
 * 但是 electron 不支持 es6 import 语法 https://stackoverflow.com/questions/35374353/es6-syntax-import-electron-require
 * 对于数据库引入及扩展操作不是很方便
 * 所以这边使用 webpack 将本身可以直接做文件入口的 electron/index.js 文件进行一次打包
 * 同时 package.json 中的 main 填入打包之后的文件 即可支持 es6 语法
 */
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
