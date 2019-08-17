const {smart} = require("webpack-merge");
const base = require("./webpack.base.js");
const {resolve} = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
module.exports = smart(base, {
  entry: [
    "react-hot-loader/patch",
    "./src/index.js"
  ],
  devServer: {
    port: 3000,
    // open: true,
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    proxy: {
      '/api': 'http://localhost:8080'
    },
    hot: true,
    hotOnly: true // 即使HMR没有生效 浏览器也不会自动更新
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: resolve(__dirname, 'src'),
      use: [{
        loader: 'react-hot-loader/webpack'
      },{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
            "@babel/plugin-transform-runtime",
            "react-hot-loader/babel"
          ]
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
});

