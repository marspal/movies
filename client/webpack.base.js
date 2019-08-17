const {resolve} = require("path");
const webpack = require('webpack');
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ]
    },{
      test: /\.sass$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  externals:{
    'react': "React",
    'react-dom' : 'ReactDOM',
    'moment': 'moment',
    'antd': 'antd'
  },
  resolve: {
    extensions: ['.js','jsx','.sass']
  },
  plugins: [
    // new webpack.DllReferencePlugin({
    //   manifest: resolve(__dirname, 'build/public', 'antd.manifest.json')
    // }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
  ]
};