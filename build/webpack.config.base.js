const path = require('path') // path是node.js中的基本包，用来处理路径
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production', // mode只接收两个值 deveolpment || production
  target: 'web', // webpack的编译目标是web平台
  // __dirname代表文件所在目录的地址，也就是根目录
  entry: path.join(__dirname, '../client/index.js'), // path.join就是把__dirname和后边的路径拼接起来，变成绝对路径，以保证我们绝对可以访问到要访问的文件
  output: {
    filename: 'bundle.[hash:8].js', // 开发环境webpack-dev-server不能使用chuckHash，否则会报错
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 把css写进html中
          'css-loader' // 从css文件中把内容读取出来
        ]
      },

      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

module.exports = config
