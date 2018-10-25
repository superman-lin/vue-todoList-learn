module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCSS: !isDev, //单独打包css（生产环境可设置单独打包dev）
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',  //自定义类名
      camelCase: true,  //把用-命名的类名转换成驼峰命名
    },
    // hotReload: false  //热重载功能(根据环境变量生成)
  }}