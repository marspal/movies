const { smart } = require('webpack-merge');
const base = require("./webpack.base.js");
const {resolve} = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = smart(base, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ]
    },{
      test: /\.sass$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    },{
      test: /\.js$/,
      exclude: /node_modules/,
      include: resolve(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
            "@babel/plugin-transform-runtime"
          ]
        }
      }
    }]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      cache: true, // 是否用缓存
      parallel: true, // 并发打包
      sourceMap: true, // 源码映射
    }),new OptimizeCssAssetsPlugin({})]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '高分电影预告片',
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 删除属性的双引号
        collapseWhitespace: true, // 变成一行
      }
    }),
    new MiniCssExtractPlugin({ 
      filename: 'main.css', 
    })
  ]
});