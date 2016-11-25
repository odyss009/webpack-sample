const webpack = require('webpack')
const path = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')

const dir_build = path.resolve(__dirname, 'dist')

module.exports = {
  plugins: [
    new DashboardPlugin()
  ],
  devServer: {
    contentBase: dir_build
  },
  devtool: 'eval'
}
