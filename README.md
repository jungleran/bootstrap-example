# Bootstrap Example

A Drupal [Bootstrap](https://www.drupal.org/project/bootstrap) 3 based subtheme (SASS)

### Requirements

- [Bootstrap 3.21.0 (8.x-3.21)](https://www.drupal.org/project/bootstrap/releases/8.x-3.21)

  Install it by composer

  ```bash
  $ composer require 'drupal/bootstrap:^3.21'
  ```

- [Node.js](https://nodejs.org/en/): v12.10.0 (Recommended)

### How to use?

1. Run `npm install gulp -g` to get gulp installed globally

2. Run `git submodule update --init --recursive` to get `drupal-bootstrap-styles`folder ready

3. Run `npm install` to get `node_modules`folder ready.

4. Run `gulp` and enjoy!

### Steps of building this subtheme.

1. Copy `starterkits/THEMENAME` to `bootstrap_example`

   - Copy `starterkits/THEMENAME` under the `DRUPAL_ROOT/themes/contrib/bootstrap`, and rename it to `bootstrap_example`under `DRUPAL_ROOT/themes/custom`(Recommended)

2. Replace/rename `THEMENAME`/`THEMETITLE` with `Bootstrap Example`/`boostrap_example`

   - Rename: THEMENAME.starterkit.yml -> bootstrap_example.info.yml
   - Rename: THEMENAME.libraries.yml -> bootstrap_example.libraries.yml
   - Rename: THEMENAME.theme -> bootstrap_example.theme
   - Rename: config/install/THEMENAME.settings.yml -> config/install/bootstrap_example.settings.yml
   - Rename: config/schema/THEMENAME.schema.yml -> config/schema/bootstrap_example.schema.yml
   - And replace THEMENAME/THEMETITLE placeholders in files.

3. Copy drupal-bootstrap-style by [Gulp](https://gulpjs.com/).

   - Add https://github.com/unicorn-fail/drupal-bootstrap-styles as a git submodule

   ```bash
   # cd DRUPAL_ROOT/themes/custom/bootstrap_example
   $ git submodule add https://github.com/unicorn-fail/drupal-bootstrap-styles
   ```

   The official guide says:

   > You must download a copy of [Drupal Bootstrap Styles](https://github.com/unicorn-fail/drupal-bootstrap-styles) and copy over the `scss`folder located at `./drupal-bootstrap-styles/src/3.x.x/8.x-3.x/scss`.

   - Instead of directly coping from it, adding [Drupal Bootstrap Styles](https://github.com/unicorn-fail/drupal-bootstrap-styles) and defining a gulp task to do it. It's good for keeping up with future changes of it.

   As the tagline indicates, this example uses Bootstrap SASS. Gulp will help us to automatic the task of Compiling SCSS source file(s) to CSS as well.

   - Install Gulp: add a package.json file with content below, especially `"gulp": "^4.0.2"` under `devDependencies`

   ```json
   {
     "name": "bootstrap-example",
     "version": "1.0.0",
     "description": "A Drupal Bootstrap 3 based sub-theme (SASS)",
     "repository": {
       "type": "git",
       "url": "git+https://github.com/jungleran/bootstrap-example.git"
     },
     "devDependencies": {
       "gulp": "^4.0.2"
     }
   }
   ```

   Run `npm install` to get gulp installed, and install it globally as well.

   ```bash
   $ npm install gulp -g
   ```

   - Add a gulpfile.js file

   ```js
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
   ```

   Define a `bridge` command to copy files required from drupal-bootstrap-style to the theme's scss folder where to put all SASS files. Meanwhile, add the command to package.json file.

   ```json
   {
     "scripts": {
       "bridge": "gulp bridge"
     }
   }
   ```

   - By running `npm bridge` or `gulp bridge`, get those files copied to the right place.
   - And remember to create a .gitignore file, ignore the `node_modules` folder.

4. Get gulp work with bootstrap sass

   - Install bootstrap-sass and gulp-sass

   ```bash
   $  npm install bootstrap-sass gulp-sass --save-dev
   ```

   - Define gulp tasks to copy `javascripts`and `fonts` from bootstrap-sass.

   ```js
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
   ```

   - Run `gulp js` and `gulp fonts` to get files copied
   - Remove commented LESS source JavaScript files and uncomment for SASS source JavaScript files from `bootstrap_example.libraries.yml`Adjust JavaScript file paths from `bootstrap/assets/javascripts/bootstrap/*`to `javascripts/bootstrap/*`
   - Adjust the `icon-font-path` in `scss/_default-variables.scss` which is copied form [Drupal Bootstrap Styles](https://github.com/unicorn-fail/drupal-bootstrap-styles)

   ```bash
   $ git diff scss/_default-variables.scss
   -$icon-font-path: '#{$theme-root}/bootstrap/assets/fonts/bootstrap/';
   +$icon-font-path: '#{$theme-root}/fonts/bootstrap/';
   ```

   - Add a sass task to complie SASS source files into css.

   ```js
   const sass = require('gulp-sass');

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

   // Compile scss files.
   gulp.task('sass', function () {
     return gulp.src(scss.in)
       .pipe(sass(scss.sassOpts))
       .pipe(gulp.dest(scss.out));
   });
   ```

   - Add a watch command to watch the change of SASS source files and compile it realtime.

   ```js
   // Realtime compiling scss files.
   gulp.task('watch', function () {
     return gulp.watch(scss.watch, gulp.series(['sass']));
   });
   ```

   - Correct the file path of Bootstrap Framework in scss/style.scss form [Drupal Bootstrap Styles](https://github.com/unicorn-fail/drupal-bootstrap-styles) as well

   ```bash
   $ git diff scss/style.scss
   -@import '../bootstrap/assets/stylesheets/bootstrap';
   +@import '../node_modules/bootstrap-sass/assets/stylesheets/bootstrap';
   ```

   - Put all together, add one `init` task and one `default` task.

   ```js
   // Init task.
   gulp.task('init', gulp.series('bridge', 'fonts',  'js', 'sass'));
   // Default task.
   gulp.task('default', gulp.series('fonts', 'js', 'sass', 'watch'));
   ```

   With the `default` task defined, it's ok to just run `gulp` to get `fonts`, `js`, `sass`, `watch`tasks running in one go. The `init` task is similar.

### Next

See [Drupal Bootstrap Documentation](https://drupal-bootstrap.org/api/bootstrap) and [scss/README.md](scss/README.md)

### References

- [Drupal Project: Bootstrap](https://www.drupal.org/project/bootstrap)
- [Official Drupal Bootstrap documentation: Sub-Theming](https://drupal-bootstrap.org/api/bootstrap/docs!Sub-Theming.md/group/sub_theming/8.x-3.x)
