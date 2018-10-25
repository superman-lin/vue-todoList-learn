const docsLoader = require.resolve('./docs-loader')

module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCSS: !isDev, //单独打包css（生产环境可设置单独打包dev）
    cssModules: {},
    // hotReload: false  //热重载功能(根据环境变量生成)
    // loaders: {
    //   'docs': docsLoader,   //给自定义的模块配置自定义的loader
    // },
    // preLoader: {},
    // postLoader: {}    loaders,preLoader,postLoader不常用
  }}