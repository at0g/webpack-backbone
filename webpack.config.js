/*eslint-env node */
var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var config = require('./config');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
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
            'marionette',
            'nunjucks-loader/runtime-shim',
            'nunjucks/browser/nunjucks-slim'
        ]
    },

    // Send output to the express development server
    output: {
        path: config.outputPath,
        filename: '[name].js',
        publicPath: config.publicPath
    },

    module: {

        // Reduce compilation time by telling webpack to not parse these libraries.
        // Only add libraries that have no dependencies eg. no require, define or similar calls.
        noParse: [
            /lodash/,
            /nunjucks\-slim/
        ],

        loaders: [
            // Transpile JS with babel
            {
                test: /\.(js|jsx|es6)?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    stage: 0
                }
            },

            // Load nunjucks templates
            {
                test: /\.(html|nunj|nunjucks)?$/,
                exclude: /node_modules/,
                loader: 'nunjucks'
            },

            // Compile less with postcss and extract the generated css to an external file
            // @see The plugins section of this file.
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!postcss!less?sourceMap')
            },

            // Use the url loader for fonts and images.
            {
                test: /\.(jpg|png|eot|svg|ttf|woff|woff2)$/,
                loader: 'url'
            },

            // Expose Marionette as a window global, so that the chrome marionette extension can locate it.
            {
                test: require.resolve('backbone.marionette'),
                loader: 'expose?Marionette'
            }
        ]
    },

    // Postcss options
    postcss: function () {
        return [
            autoprefixer
        ];
    },

    resolve: {

        root: __dirname,

        // Resolve extensionless files with the list below.
        // Eg. require('foo') will resolve to 'foo.js', 'foo/index.jsx' etc.
        extensions: ['', '.js', '.jsx', '.es6'],

        // Add the src directory as a modules location
        modulesDirectories: [
            'src',
            'node_modules'
        ],

        alias: {
            // Alias backbone to the version installed as a dependency of marionette
            backbone: 'backbone.marionette/node_modules/backbone/backbone.js',

            // Alias backbone.wreqr to the version installed as a dependency of marionette
            'backbone.wreqr': 'backbone.marionette/node_modules/backbone.wreqr/lib/backbone.wreqr.js',

            // Alias marionette to backbone.marionette to reduce the amount of typing in import statements
            marionette: 'backbone.marionette',

            // Alias wreqr to backbone.wreqr to reduce the amount of typing in import statements
            wreqr: 'backbone.wreqr'
        }

    },

    externals: {
        // Load jQuery from CDN to reduce build size and take advantage of parallel requests
        jquery: 'jQuery'
    },

    // Generate source maps
    devtool: 'source-map',

    plugins: [
        // Required for the express proxy to use HMR
        new webpack.HotModuleReplacementPlugin(),

        new BrowserSyncPlugin({
            proxy: 'localhost:' + config.port
        }, {
            reload: false
        }),

        // Use lodash in place of underscore
        new webpack.NormalModuleReplacementPlugin(/underscore/, 'lodash'),

        // Write CSS to a styles.css file
        new ExtractTextPlugin('styles.css'),

        // Create an explicit vendor commons chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        })
    ]
};