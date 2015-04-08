# gulp-rebase-css-urls

> A [Gulp](http://gulpjs.com/) plugin for bundling js and css resources as an external reference.

## Overview

The plugin is minimalistic and simple. It rebases all css urls to a chosen new base.

## Example

```
+ src
    - file.css
    + fldr
        - image.jpg
        - file2.css
```

Where 'file.css' contents are:

```css
.a{
    background-image: url("fldr/image.jpg");
}
```

and 'file2.css':

```css
.b{
    background-image: url("image.jpg");
}
```

And the task

```js
var rebaseCssUrls = require('gulp-rebase-css-urls'),
    concat = require('gulp-concat');

gulp.task('concat-css-files', ['copy-image-file'], function(){
    return gulp.src('src/**/*.css')
        .pipe(rebaseCssUrls(srcDir))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(dstDir));
});
```

Results in a directory like so:

```
+ dst
    - bundle.css
    + fldr
        - image.jpg
```

And a bundle.css contents like so:

```css
.a{
    background-image: url("fldr/image.jpg");
}
.b{
    background-image: url("fldr/image.jpg");
}
```

## Parameters

`rebaseCssUrls(base)`

### base
Type: `String`

The new base url, comparing to initial file's src.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Gulp](http://gulpjs.com/).

## Release History
 - 0.0.1 - Basic features.

## TODO
Add comparison of actual and expected libraries

## License
[MIT](https://github.com/welldone-software/gulp-bundle-file/blob/master/LICENSE)