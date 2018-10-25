module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCSS: !isDev, //单独打包css（生产环境可设置单独打包dev）
    cssModules: {},
    // hotReload: false  //热重载功能(根据环境变量生成)
  }}