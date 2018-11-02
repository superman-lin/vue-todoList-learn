const path = require('path') // path是node.js中的基本包，用来处理路径
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // 此工具用来很好的合理的合并webpack配置
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config.base.js')

// const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true // 把错误显示到网页上面
  },
  hot: true
  // open: true,  //自动打开浏览器
}

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': { // 区分环境
      NODE_ENV: '"development"'
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './template.html')
  })
]

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader', // 使用css的热更新时要使用vue-style-loader
              {
                loader: 'css-loader',
                options: {
                  module: true, // 开启css Modules
                  localIdentName: '[path]-[name]-[hash:base64:5]', // 自定义类名
                  camelCase: true // 把用-命名的类名转换成驼峰命名
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          },
          {
            use: [
              'vue-style-loader', // 使用css的热更新时要使用vue-style-loader
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          }
        ]
        // exclude: /node_modules/
      }
    ]
  },
  devServer,
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin() // 热加载
    // new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
