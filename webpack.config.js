/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: 0 */
'use strict'

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: process.env.BUILD_MODE || 'development',
  context: __dirname,
  entry: {
    main: [
      './app/app.tsx',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].min.js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        resolve: {
          extensions: ['.ts', '.tsx'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[hash:base64]',
                namedExport: true,
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new CaseSensitivePathsPlugin(), // because macOS dev
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
    }),
  ],
  resolve: {
    modules: [
      path.join('./app'),
      // This significantly speeds up build times.
      path.join('./node_modules'),
    ],
  },
  // Webpack hosts the files here. Also serves as a reverse proxy to
  // localProxy/proxy.js.
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    proxy: [
      {
        path: '/**',
        quiet: false,
        noInfo: false,
        logLevel: 'debug',
        changeOrigin: true,
        stats: { color: true },
        toProxy: true,
        target: 'http://localhost:8081',
        pathRewrite: { '^/api': '' }, // rewrite /api to /
        context: [
          '/api/**',
        ],
      },
    ],
  },
}
