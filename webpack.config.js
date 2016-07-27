var path = require('path')
var webpack = require('webpack')
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var cleanPlugin = require('clean-webpack-plugin')
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CopyWebpackPlugin = require('copy-webpack-plugin')

var dir_html = path.resolve(__dirname, 'html')
var dir_build = path.resolve(__dirname, 'dist')
var debug = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: {
        vendor: ["jquery"],
        'dist/app/p1/app': "./src/page1/page1.js",
        'dist/app/p2/app': "./src/page2/page2.js",
        'dist/app/p3/app': "./src/page3/page3.js"
    },
    // entry: './entry.js',
    output: {
        path: './',
        filename: '[name].js',
        pathinfo: true,
        publicPath: '/assets/'
    },
    devServer: {
        contentBase: dir_build
    },
    module: {
        // noparse: [],
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
            // {
            //   test: /\.css$/,
            //   loader: 'style-loader!css-loader'
            // },
            // {
            //   test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*)?$/,
            //   loader: 'url-loader?limit=100000'
            // },
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
        extensions: ["", ".js", ".es6"],
        alias: {
            'angular-summernote': 'angular-summernote/dist/angular-summernote.js'
        }
    },
    plugins: [
        // new cleanPlugin([dir_build]),
        new ngAnnotatePlugin({
            add: true
        }),
        // new CopyWebpackPlugin([{
        //   from: dir_html // to: output.path
        // }]),
        // Avoid publishing files when compilation fails
        new CommonsChunkPlugin({
            name: "vendor",
            filename: "dist/lib/commons.js",
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            title: "Title A",
            filename: "/dist/app/p1/index.html",
            template: './html/index.html',
            chunks: ['vendor', 'dist/app/p1/app']
        }),
        new HtmlWebpackPlugin({
            title: "Title B",
            filename: "/dist/app/p2/index.html",
            template: './html/index.html',
            chunks: ['vendor', 'dist/app/p2/app']
        }),
        new HtmlWebpackPlugin({
            title: "Title C",
            filename: "/dist/app/p3/index.html",
            template: './html/index.html',
            chunks: ['vendor', 'dist/app/p3/app']
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DefinePlugin({
            // This is for summernote. but it doesn't work because it has problem with context
            'require.specified': 'require.resolve'
        }),
        // new ExtractTextPlugin("[name].css")
        // This is for bower package
        // new webpack.ResolverPlugin(
        //   new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        // ),
        // new webpack.IgnorePlugin(/node_modules\/dist\/summernote/),
        // new webpack.ContextReplacementPlugin(/node_modules\/dist\/summernote/, /No/),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ],
    stats: {
        colors: true,
        reasons: true
    },
    devtool: 'eval' //source-map
}
