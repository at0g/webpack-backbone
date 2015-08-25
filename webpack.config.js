/*eslint-env node */

var path = require('path');
var webpack = require('webpack');
var config = require('./config');

module.exports = {

    entry: [
        'main',

        // For hot module replacement
        'webpack/hot/dev-server',

        // The script refreshing the browser on non-hot updates
        'webpack-dev-server/client?http://localhost:' + config.webpackPort
    ],

    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        filename: '[name].js',
        publicPath: config.publicPath
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx|es6)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    stage: 0
                }
            }
        ]
    },

    resolve: {

        root: __dirname,

        extensions: ['', '.js', '.jsx', '.es6'],

        modulesDirectories: [
            'src',
            'node_modules'
        ]
    },

    devtool: 'source-map',

    plugins: [
        // Required for the express proxy to use hot module replacement
        new webpack.HotModuleReplacementPlugin()

        // Allows compile time replacement of one module with another
        //new webpack.NormalModuleReplacementPlugin(/web\/utils/, 'windows/utils')
    ]
};
