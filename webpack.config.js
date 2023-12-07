/* eslint-env node */

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
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
    hot: true,
    host: '0.0.0.0',
    port: 9000,
    watchFiles: [
      'app/**/*.tsx',
      'app/**/*.m.css',
      'app/**/*.ts',
    ],
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    proxy: {
      '/**': {
        toProxy: true,
        target: 'http://localhost:8081',
        pathRewrite: {
          // rewrite /api to /
          '^/api': '',
        },
      },
    },
  },
}

if (config.mode === 'development') {
  config.devtool = 'eval-cheap-module-source-map'
}

export default config
