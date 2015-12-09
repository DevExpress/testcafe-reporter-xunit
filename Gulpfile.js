var gulp    = require('gulp');
var eslint  = require('gulp-eslint');
var babel   = require('gulp-babel');
var mocha   = require('gulp-mocha');
var del     = require('del');
var publish = require('publish-please');

gulp.task('clean', function (cb) {
    del('lib', cb);
});

gulp.task('lint', function () {
    return gulp
        .src([
            'src/**/*.js',
            'test/**/*.js',
            'Gulpfile.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', ['clean', 'lint'], function () {
    return gulp
        .src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('test', ['build'], function () {
    return gulp
        .src('test/**.js')
        .pipe(mocha({
            ui:       'bdd',
            reporter: 'spec',
            timeout:  typeof v8debug === 'undefined' ? 2000 : Infinity // NOTE: disable timeouts in debug
        }));
});

gulp.task('preview', ['build'], function () {
    var pluginTestingUtils = require('testcafe').pluginTestingUtils;
    var pluginFactory      = require('./lib');
    var testCalls          = require('./test/data/test-calls');
    var plugin             = pluginTestingUtils.buildReporterPlugin(pluginFactory);

    console.log();

    testCalls.forEach(function (call) {
        plugin[call.method].apply(plugin, call.args);
    });

    process.exit(0);
});

gulp.task('publish', ['test'], function () {
    return publish();
});
