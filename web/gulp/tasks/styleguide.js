/* STYLEGUIDE task */

/**
 * plugins
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    cp = require('child_process'),
    jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll",
    sass = require('gulp-sass'),
    reporter = require("postcss-reporter"),
    syntax = require("postcss-scss"),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps');

/**
 * configfile
 */
var config = require('../config');

/**
 * Build the Jekyll Site
 */


gulp.task('jekyll-build', function (done) {
    return cp.spawn(jekyll, ['build'], {stdio: 'inherit', cwd: config.styleguide.path}).on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('styleguide-browser-sync', ['src', 'jekyll-build'], function () {
    browserSync({
        server: {
            baseDir: config.styleguide.path + '_site'
        },
        notify: false,
        reloadDelay: 2000
    });
});

/**
 * Postcss processors
 */
var processors = [
    autoprefixer(config.scss.prefix)
];

/**
 * Compile styleguide core css
 */
gulp.task('styleguide-src', function () {
    return gulp.src(config.styleguide.scss.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync(config.styleguide.scss.settings)
            .pipe(sass())
            .on('error', sass.logError))
        .pipe(postcss(processors, {syntax: syntax}))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(browserSync.stream({match: '**/*.css'}))
        .pipe(gulp.dest(config.styleguide.scss.dest))
        .pipe(gulp.dest(config.styleguide.jekyllDest))
});

/**
 * Watch src files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */


gulp.task('styleguide-watch', ['styleguide-browser-sync', 'src', 'styleguide-scss'], function () {
    watch(config.scss.glob, function (event) {
        gulp.start('scss');
    });
    watch(config.styleguide.scss.src, function (event) {
        gulp.start('styleguide-src');
        gulp.start('scss');
    });
    watch(config.styleguide.files, function (event) {
        gulp.start('jekyll-rebuild');
    });
});