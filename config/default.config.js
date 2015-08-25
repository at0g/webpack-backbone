/*eslint-env node */

var path = require('path');

module.exports = {

    // The port to run the development http server
    port: process.env.PORT || 3000,

    // The port to run the webpack-dev-server (proxied by the http server)
    webpackPort: process.env.WEBPACK_PORT || 8080,

    // The path that webpack writes assets - webpack-dev-server serves these files from memory, but when webpack is
    // compiled, the output will be placed in this directory.
    outputPath: path.resolve(process.cwd(), 'public', 'build'),

    // The public path prefix to access the outputPath via HTTP
    publicPath: '/build/'

};