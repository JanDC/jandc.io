/* default task */

/**
 * Plugins
 */
var gulp = require('gulp');

/**
 * Tasks
 */
gulp.task('build', [
    'svg',
    'svg-sprite',
    'scss',
]);