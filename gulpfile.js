const gulp = require('gulp');
const sass = require('gulp-sass');

// drupal-bootstrap-styles source
const drupal_bootstrap_styles_ = {
  in: ['drupal-bootstrap-styles/src/3.x.x/8.x-3.x/scss/**/*'],
  out: 'scss/'
};

// Bootstrap scss source
const bootstrap_sass = {
  in: './node_modules/bootstrap-sass/'
};

// Bootstrap fonts source
const fonts = {
  in: bootstrap_sass.in + 'assets/fonts/**/*',
  out: 'fonts/'
};

// Bootstrap js source
const js = {
  in: bootstrap_sass.in + 'assets/javascripts/bootstrap/*',
  out: 'javascripts/bootstrap/'
};


// SASS source folder: .scss files
const scss = {
  in:  'scss/style.scss',
  out:  'css/',
  // All .scss files under scss folder.
  watch:  ['scss/**/*.scss'],
  sassOpts: {
    outputStyle: 'nested',
    precision: 5,
    errLogToConsole: true,
    includePaths: [bootstrap_sass.in + 'assets/stylesheets']
  }
};

// Copy drupal-bootstrap-styles to dest.
gulp.task('bridge', function () {
  return gulp
    .src(drupal_bootstrap_styles_.in)
    .pipe(gulp.dest(drupal_bootstrap_styles_.out));
});

// Copy bootstrap required fonts to dest.
gulp.task('fonts', function () {
  return gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

// Copy bootstrap required js to dest.
gulp.task('js', function () {
  return gulp
    .src(js.in)
    .pipe(gulp.dest(js.out));
});

// Compile scss files.
gulp.task('sass', function () {
  return gulp.src(scss.in)
    .pipe(sass(scss.sassOpts))
    .pipe(gulp.dest(scss.out));
});

// Realtime compiling scss files.
gulp.task('watch', function () {
  return gulp.watch(scss.watch, gulp.series(['sass']));
});

// Init task.
gulp.task('init', gulp.series('bridge', 'fonts',  'js', 'sass'));

// Default task.
gulp.task('default', gulp.series('fonts', 'js', 'sass', 'watch'));
