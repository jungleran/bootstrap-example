const gulp = require('gulp');

// drupal-bootstrap-styles source
const drupal_bootstrap_styles_ = {
  in: ['drupal-bootstrap-styles/src/3.x.x/8.x-3.x/scss/**/*'],
  out: 'scss/'
};

// Copy drupal-bootstrap-styles to dest.
gulp.task('bridge', function () {
  return gulp
    .src(drupal_bootstrap_styles_.in)
    .pipe(gulp.dest(drupal_bootstrap_styles_.out));
});
