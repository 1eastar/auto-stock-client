const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

// const resolveAlias = require('./webpack/resolveAlias')

const prod = process.env.NODE_ENV === 'production'

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'hidden-source-map' : 'eval',
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // alias: { ...resolveAlias },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
      },
      {
        test: /\.(jpeg|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'build/'),
    port: 3001,
    // publicPath: 'http://localhost:3001/build/',
    disableHostCheck: true,
    hotOnly: true,
    hot: true,
    watchOptions: {
      ignored: [
        /[\\/]\.git[\\/]/,
        /[\\/]node_modules[\\/]/,
      ],
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: './server/views/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'app.css' }),
  ],
}
