/*eslint-env node */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var config = require('../../config');
var pathToWebpackConfig = path.resolve(process.cwd(), 'webpack.config.js');
var webpackConfig = require(pathToWebpackConfig);

module.exports = function () {

    // First we fire up webpack, passing int the webpack config
    var compiler = webpack(webpackConfig);

    var bundleStart = null;

    // We give notice in the terminal when it starts bundling and set the time when bundling starts
    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    // Give notice when compilation is complete, including the build time.
    compiler.plugin('done', function() {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    var bundler = new WebpackDevServer(compiler, {
        // We need to tell Webpack to serve our bundled application
        // from the build path.
        // http://localhost:PORT/build -> http://localhost:WEBPACK_PORT/build
        publicPath: config.publicPath,

        // Configure hot replacement
        hot: true,

        // The rest is terminal configurations
        quiet: true,
        noInfo: true,
        stats: {
            colors: true
        }
    });

    // Start up the development server and give notice in the terminal of beginning the initial bundle
    bundler.listen(config.webpackPort, 'localhost', function () {
        console.log('Bundling project, please wait...');
    });

};
