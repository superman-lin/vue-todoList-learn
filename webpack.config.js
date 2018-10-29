const path = require('path') // path是node.js中的基本包，用来处理路径
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web', // webpack的编译目标是web平台
  // __dirname代表文件所在目录的地址，也就是根目录
  entry: path.join(__dirname, 'src/index.js'), // path.join就是把__dirname和后边的路径拼接起来，变成绝对路径，以保证我们绝对可以访问到要访问的文件
  output: {
    filename: 'bundle.[hash:8].js', // 开发环境webpack-dev-server不能使用chuckHash，否则会报错
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 把css写进html中
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
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { // 区分环境
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HtmlWebpackPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader',
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
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true // 把错误显示到网页上面
    },
    hot: true
    // open: true,  //自动打开浏览器
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 热加载
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'), // app.js存放业务代码，版本更新迭代，经常变动
    vendor: ['vue'] // vendor.js存放类库代码，稳定性较高，不容易变动
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
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
  })
  config.plugins.push(
    new ExtractTextPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // name属性值要和入口文件entry的vendor相同
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime' // vendor一定要放在runtime的前面，否则会失去作用
    })
  )
}

module.exports = config
