/*eslint-env node */
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('./config');

gulp.task('server', function (done) {
    var hasRun = false;
    nodemon({
        script: 'src/server',
        watch: [
            './src/server',
            './src/templates'
        ],
        ext: 'js,nunj'
    })
    .on('start', function () {
        if(!hasRun) {
            hasRun = true;
            done();
        }
    });
});

gulp.task('default', ['server'], function () {

});