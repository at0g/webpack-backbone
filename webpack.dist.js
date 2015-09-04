var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var _ = require('lodash');
var devConfig = require('./webpack.config');

var distConfig = _.extend({}, devConfig);

// Remove the hot module stuff from main.js
distConfig.entry.main = 'main.js';

// turn off js sourcemaps
delete distConfig.devtool;

// Turn off css sourcemaps
distConfig.module.loaders = distConfig.module.loaders.reduce(function(memo, loader) {
    if (loader.test.test && loader.test.test('test.less') ) {
        loader.loader = ExtractTextPlugin.extract('css!postcss!less');
    }
    memo.push(loader);
    return memo;
}, []);


// Modify the plugins array
distConfig.plugins = distConfig.plugins.concat(
    new webpack.DefinePlugin({
        'process.env': {
            // This has effect on the react lib size
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.DedupePlugin()
);


module.exports = distConfig;