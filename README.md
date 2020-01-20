# Bootstrap Example

A Drupal [Bootstrap](https://www.drupal.org/project/bootstrap) 3 based subtheme (SASS)


### Requirements

- [Bootstrap 3.21.0 (8.x-3.21)](https://www.drupal.org/project/bootstrap/releases/8.x-3.21)
- [Node.js](https://nodejs.org/en/): v12.10.0 (Recommended)
- [Gulp](https://gulpjs.com/): 4.0.2 (Recommended)

Install it by composer

```bash
$ composer require 'drupal/bootstrap:^3.21'
```

### Steps of building this subtheme.

1. Copy `starterkits/THEMENAME` to `bootstrap_example`

    > Copy `starterkits/THEMENAME` under the `DRUPAL_ROOT/themes/contrib/bootstrap`, and rename it to `bootstrap_example` under
 `DRUPAL_ROOT/themes/custom` (Recommended)

2. Replace/rename `THEMENAME`/`THEMETITLE` with `Bootstrap Example`/`boostrap_example`

    - Rename: THEMENAME.starterkit.yml -> bootstrap_example.info.yml
    - Rename: THEMENAME.libraries.yml -> bootstrap_example.libraries.yml
    - Rename: THEMENAME.theme -> bootstrap_example.theme
    - Rename: config/install/THEMENAME.settings.yml -> config/install/bootstrap_example.settings.yml
    - Rename: config/schema/THEMENAME.schema.yml -> config/schema/bootstrap_example.schema.yml
    - And replace THEMENAME/THEMETITLE placeholders in files.

3. Copy drupal-bootstrap-style by [Gulp](https://gulpjs.com/).

    Add https://github.com/unicorn-fail/drupal-bootstrap-styles as a git submodule
    ```bash
    # cd DRUPAL_ROOT/themes/custom/bootstrap_example
    $ git submodule add https://github.com/unicorn-fail/drupal-bootstrap-styles
    ```
    The official guide says:
    > You must download a copy of [Drupal Bootstrap Styles](https://github.com/unicorn-fail/drupal-bootstrap-styles) and copy over the `scss` folder located at `./drupal-bootstrap-styles/src/3.x.x/8.x-3.x/scss`.

    Instead of directly coping from it, adding [Drupal Bootstrap Styles](https://github.com/unicorn-fail/drupal-bootstrap-styles) and defining a gulp task to do it.
    It's good for keeping up with future changes of it.

    As the tagline indicates, this example uses Bootstrap SASS. Gulp will help us to automatic the task of
    Compiling SCSS source file(s) to CSS as well.

    **Install Gulp**

    Add a package.json file with content below, especially `"gulp": "^4.0.2"` under `devDependencies`

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
    Add a gulpfile.js file
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
    Define a `bridge` command to copy files required from drupal-bootstrap-style to the theme's scss folder
    where to put all SASS files. Meanwhile, add the command to package.json file.
    ```json
    {
      "scripts": {
        "bridge": "gulp bridge"
      }
    }
    ```

    By running `npm bridge` or `gulp bridge`, get those files copied to the right place.

    And remember to create a .gitignore file, ignore the `node_modules` folder.

    For new environment, at this theme's root folder:
    - Run `git submodule update --init --recursive` get `drupal-bootstrap-styles` folder ready
    - Run `npm install` to get `node_modules` folder ready.

### References

- [Drupal Project: Bootstrap](https://www.drupal.org/project/bootstrap)
- [Official Drupal Bootstrap documentation: Sub-Theming](https://drupal-bootstrap.org/api/bootstrap/docs!Sub-Theming.md/group/sub_theming/8.x-3.x)
