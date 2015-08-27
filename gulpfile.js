/*eslint-env node */
var _ = require('lodash');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dist');
var config = require('./config');

var nodemonDefaultOptions = {
    script: 'src/dev-server',
    watch: [
        './src/dev-server'
    ],
    ext: 'js,nunj'
};

var nodemonHotOptions = _.extend({
    // Setting HOT:1 tells the express server to proxy a webpack-dev-server and to use hot module replacement.
    // In this configuration, the bundled files are served from memory and never written to disk.
    // @see src/dev-server/bundler.js
    env: { HOT: 1 }
}, nodemonDefaultOptions);

var nodemonBuildOptions = _.extend({
    // Setting HOT:0 tells the express server NOT to run the webpack-dev-server, instead a webpack build is created
    // without hot module replacement. The bundle is written to disk and then served as static files by express.
    env: { HOT: 0 }
}, nodemonDefaultOptions);

// Delete build files. When using HMR the assets are served from memory rather than the filesystem, and when writing a
// dist build to disk, any old files should be purged first.
gulp.task('clean:build', function (done) {
    del(config.outputPath, done);
});


// Run the default development server that proxies the webpack-dev-server (HMR enabled)
gulp.task('dev-server', ['clean:build'], function (done) {
    var hasRun = false;
    nodemon(nodemonHotOptions)
    .on('start', function () {
        if(!hasRun) {
            hasRun = true;
            done();
        }
    });
});


// Run the development server to preview a production build - no HMR and the bundle is served from disk.
gulp.task('run-dev-build', ['webpack:build'], function (done) {
    var hasRun = false;
    nodemon(nodemonBuildOptions)
    .on('start', function () {
        if(!hasRun) {
            hasRun = true;
            done();
        }
    });
});



// Create a production build with webpack
gulp.task('webpack:build', ['clean:build'], function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack:build', err);
        }

        gutil.log('[webpack:build]', stats.toString({
            colors: true,
            modulesSort: 'size'
        }));

        callback();
    });
});


// Create a production build (slower) and then preview the build using the development server.
// Note that in this mode, the bundles are not rebuilt when files change.
// To get live updates when editing, using the default task.
gulp.task('dev-build', ['run-dev-build']);

// Run the default development workflow with HMR.
gulp.task('default', ['dev-server']);