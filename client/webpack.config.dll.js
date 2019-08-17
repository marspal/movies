const {resolve} = require("path");
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: {
    antd: ['antd']
  },
  output: {
    filename: '_dll_[name].js',
    path: resolve(__dirname, 'build/public'),
    library: '_dll_[name]',
    libraryTarget: 'var'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: resolve(__dirname, 'build/public', '[name].manifest.json')
    })
  ]
}