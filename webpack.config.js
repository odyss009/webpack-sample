const path = require('path')
const argv = require('yargs').argv

const webpack = require('webpack')
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackMerge = require('webpack-merge')

const devConfig = require('./webpack.dev.config.js')
const prodConfig = require('./webpack.prod.config.js')

const dir_html = path.resolve(__dirname, 'html')
const dir_build = path.resolve(__dirname, 'dist')

const debug = process.env.NODE_ENV !== 'production'
const target = process.env.npm_lifecycle_event

const common = {
    entry: {
        vendor: ["jquery"],
        'app/p1/app': "./src/page1/page1.js",
        'app/p2/app': "./src/page2/page2.js",
        'app/p3/app': "./src/page3/page3.js"
    },
    output: {
        path: './dist/',
        filename: '[name].js',
        pathinfo: true,
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                  presets: ['es2015'],
                  cacheDirectory: true
                }
            },
            {
                test: /global\/*/,
                loader: "exports?window.lc"
            },
            {
                test: /summernote\.js/,
                loader: "imports?require=>false"
            }
        ]
    },
    resolve: {
        extensions: ["", ".js"],
        alias: {
            'angular-summernote': 'angular-summernote/dist/angular-summernote.js'
        }
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "vendor",
            filename: "lib/commons.js",
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            title: "Title A",
            filename: "app/p1/index.html",
            template: './html/index.html',
            chunks: ['vendor', 'app/p1/app']
        }),
        new HtmlWebpackPlugin({
            title: "Title B",
            filename: "app/p2/index.html",
            template: './html/index.html',
            chunks: ['vendor', 'app/p2/app']
        }),
        new HtmlWebpackPlugin({
            title: "Title C",
            filename: "app/p3/index.html",
            template: './html/index.html',
            chunks: ['vendor', 'app/p3/app']
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    stats: {
        colors: true,
        reasons: true
    }
}

var config

if(target === 'build') {
  config = webpackMerge(common, prodConfig)
} else {
  config = webpackMerge(common, devConfig)
}

module.exports = config
