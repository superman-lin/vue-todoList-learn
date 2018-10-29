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
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin() // 热加载
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js') // app.js存放业务代码，版本更新迭代，经常变动
      // vendor: ['vue'] // vendor.js存放类库代码，稳定性较高，不容易变动
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      module: true, // 开启css Modules
                      localIdentName: '[hash:base64:5]', // 自定义类名
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
              })
            },
            {
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
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      // 如果`npm run build`时报错(webpack: 4.23.1会报错，webpack4.0.0使用contenthash不会报错)
      // `Error: Path variable [contenthash] not implemented in this context: styles.[contentHash].css `
      // 将`contenthash`换成`hash`，也可删除不用hash值`[name].css`
      new ExtractTextPlugin('styles.[hash:8].css')
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor' // name属性值要和入口文件entry的vendor相同
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime' // vendor一定要放在runtime的前面，否则会失去作用
      // })
    ])
  })
}

module.exports = config
