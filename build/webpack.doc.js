const path = require('path')
const webpack = require('webpack')
//  将css单独打包成一个文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 拷贝文件和文件夹
// 生成html5以便在浏览器打开
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// css压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// js压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = require('./config')

const isProd = process.env.NODE_ENV === 'production'
const isPlay = !!process.env.PLAY_ENV

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd ? {
    docs: './example/entry.js'
  } : (isPlay ? './example/play.js' : './example/entry.js'),
  output: {
    path: path.resolve(process.cwd(), './example/ui-cli/'),
    publicPath: process.env.CI_ENV || '',
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    publicPath: '/',
    hot: true
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  // loader的执行顺序是由上到下的，而enforce属性能改变loader执行顺序
  module: {
    rules: [
      {
        enforce: 'pre', // 表示优先处理
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        // todo: 这种写法有待调整
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: './index.html'
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.FAAS_ENV': JSON.stringify(process.env.FAAS_ENV)
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  optimization: {
    minimizer: []
  },
  devtool: '#eval-source-map'
}

if (isProd) {
  webpackConfig.externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'highlight.js': 'hljs'
  }
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css'
    })
  )
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  )
  // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: 'ui-cli',
        chunks: 'all'
      }
    }
  }
  webpackConfig.devtool = false
}

module.exports = webpackConfig
