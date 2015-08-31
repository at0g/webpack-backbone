/*eslint-env node */
var express = require('express');
var request = require('request');
var expressStatic = require('express-static');
var nunjucks = require('nunjucks');
var bundler = require('./bundler');
var path = require('path');

var app = express();
var config = require('../../config');

nunjucks.configure(path.join(__dirname, 'templates'), { express: app });

if (process.env.HOT === '1') {
    // Proxy requests for webpack assets from the express server to the webpack dev server
    app.all('/build/*', function (req, res) {
        var webpackServer = 'http://localhost:' + config.webpackPort;
        req.pipe(request(webpackServer + req.path)).pipe(res);
    });

    bundler();
}
else {
    app.use(config.publicPath, expressStatic(config.outputPath) );
}

app.get('/*', function (req, res) {
    res.render('html.nunj');
});

app.listen(config.port, function () {
    console.log('Express app running on port %s', config.port);
});

module.exports = app;