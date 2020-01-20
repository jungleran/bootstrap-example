# Bootstrap Example

A Drupal [Bootstrap](https://www.drupal.org/project/bootstrap) 3 based subtheme (SASS)


### Requirements

- [Bootstrap 3.21.0 (8.x-3.21)](https://www.drupal.org/project/bootstrap/releases/8.x-3.21)

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
