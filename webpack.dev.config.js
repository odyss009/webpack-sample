const webpack = require('webpack')
const path = require('path')

const dir_build = path.resolve(__dirname, 'dist')

module.exports = {
  devServer: {
    contentBase: dir_build
  },
  devtool: 'eval'
}
