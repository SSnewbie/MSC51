const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/build'
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    contentBase: "./", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.tpl.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]

}