const path = require('path') // path是node.js中的基本包，用来处理路径
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // 此工具用来很好的合理的合并webpack配置
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')

const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  port: 8000,
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
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HtmlWebpackPlugin()
]

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl$/,
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
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(), // 热加载
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'), // app.js存放业务代码，版本更新迭代，经常变动
      vendor: ['vue'] // vendor.js存放类库代码，稳定性较高，不容易变动
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractTextPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor' // name属性值要和入口文件entry的vendor相同
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime' // vendor一定要放在runtime的前面，否则会失去作用
      })
    ])
  })
}

module.exports = config
