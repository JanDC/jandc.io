/* Watch task */

/**
 * plugins
 */
var gulp = require('gulp'),
  watch = require('gulp-watch');

/**
 * configs
 */
var config = require('../config');

/**
 * Tasks
 */
gulp.task('watch', ['default', 'browsersync'], function () {
    watch(config.scss.glob, function () {
        gulp.start('scss');
    });
    watch(config.files, function () {
        gulp.start('browsersyncReload');
    });
    watch(config.svg.svgsprite.src, function () {
        gulp.start('svg-sprite');
    });
    watch(config.svg.src, function () {
        gulp.start('svg');
    });
});
