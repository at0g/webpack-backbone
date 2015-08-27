/*eslint-env node */
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dist');
var config = require('./config');

gulp.task('clean:build', function (done) {
    del(config.outputPath, done);
});

gulp.task('dev-server', ['clean:build'], function (done) {
    var hasRun = false;
    nodemon({
        script: 'src/dev-server',
        watch: [
            './src/dev-server'
        ],
        ext: 'js,nunj',
        env: {
            HOT: 1
        }
    })
    .on('start', function () {
        if(!hasRun) {
            hasRun = true;
            done();
        }
    });
});

gulp.task('build-server', ['webpack:build'], function (done) {
    var hasRun = false;
    nodemon({
        script: 'src/dev-server',
        watch: [
            './src/dev-server'
        ],
        ext: 'js,nunj',
        env: {
            HOT: false
        }
    })
    .on('start', function () {
        if(!hasRun) {
            hasRun = true;
            done();
        }
    });
});


gulp.task('webpack:build', ['clean:build'], function(callback) {
    // run webpack
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


gulp.task('build', ['build-server']);

gulp.task('default', ['dev-server']);