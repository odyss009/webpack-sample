const webpack = require('webpack')
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  output: {
    filename: "[name]-[chunkhash].js"
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "vendor",
      filename: "lib/common-[hash].js",
      minChunks: Infinity,
    }),
    new CleanWebpackPlugin(['dist/*'], {
      verbose: true,
      dry: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  devtool: 'sourcemap'
}

