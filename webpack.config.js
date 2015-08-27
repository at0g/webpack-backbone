/*eslint-env node */
var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var config = require('./config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {

        // Bundle main with the webpack dev server / hot module replacement scripts for live updates
        main: [
            'main.js',
            // For hot module replacement
            'webpack/hot/dev-server',
            // The script refreshing the browser on non-hot updates
            'webpack-dev-server/client?http://localhost:' + config.webpackPort
        ],

        // Create an explicit vendor chunk for long-term caching of vendor libraries.
        // See the commons chunk definition in the plugins section of this file.
        vendor: [
            'detect-dom-ready',
            'marionette',
            'nunjucks-loader/runtime-shim',
            'nunjucks/browser/nunjucks-slim'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        filename: '[name].js',
        publicPath: config.publicPath
    },

    module: {

        noParse: [
            /lodash/,
            /nunjucks\-slim/
        ],

        loaders: [
            {
                test: /\.(js|jsx|es6)?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    stage: 0
                }
            },
            {
                test: /\.(html|nunj|nunjucks)?$/,
                exclude: /node_modules/,
                loader: 'nunjucks'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!postcss!less?sourceMap')
            },
            {
                test: /\.(jpg|png|eot|svg|ttf|woff|woff2)$/,
                loader: 'url'
            },

            // Expose Marionette as a window global, so that the chrome marionette extension locates it.
            {
                test: require.resolve('backbone.marionette'),
                loader: 'expose?Marionette'
            }
        ]
    },

    postcss: function () {
        return [
            autoprefixer
        ];
    },

    resolve: {

        root: __dirname,

        extensions: ['', '.js', '.jsx', '.es6'],

        modulesDirectories: [
            'src',
            'node_modules'
        ],

        alias: {
            wreqr: 'backbone.wreqr',
            marionette: 'backbone.marionette'
        }

    },

    externals: {
        // Load jQuery from CDN to reduce build size and take advantage of parallel requests
        jquery: 'jQuery'
    },

    devtool: 'source-map',

    cache: true,

    plugins: [
        // Required for the express proxy to use HMR
        new webpack.HotModuleReplacementPlugin(),

        // Use lodash in place of underscore
        new webpack.NormalModuleReplacementPlugin(/underscore/, 'lodash'),

        new ExtractTextPlugin('styles.css'),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        })
    ]
};