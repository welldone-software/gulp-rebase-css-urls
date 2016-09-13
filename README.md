# gulp-rebase-css-urls

> A [Gulp](http://gulpjs.com/) plugin for bundling js and css resources as an external reference.

## Overview

The plugin is minimalistic and simple. It rebases a chosen css files stream urls to a new base url.

## Example

For the following folder and file structure:

```
+ src
    - file.css
    + folder1
        - image.jpg
        - file2.css
```

Where 'file.css' contents are relative to `src`:

```css
.a{
    background-image: url("folder1/image.jpg");
}
```

and 'file2.css' contents are relative to `folder1`:

```css
.b{
    background-image: url("image.jpg");
}
```

And the task:

```js
var srcDir = 'src',
    destDir = 'dest',
    rebaseCssUrls = require('gulp-rebase-css-urls'),
    concat = require('gulp-concat');

gulp.task('concat-css-files', ['copy-image-file'], function(){
    return gulp.src(srcDir + '/**/*.css')
        .pipe(rebaseCssUrls(srcDir)) //this makes .b's background-image url relative to srcDir
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(destDir));
});
```

So the results in the destination directory looks like this:

```
+ dest
    - bundle.css
    + fldr
        - image.jpg
```

With the bundle.css contents like so:

```css
.a{
    background-image: url("fldr/image.jpg");
}
.b{
    background-image: url("fldr/image.jpg");
}
```

Notice how both `.a` and `.b`'s URLs are relative and based on the same base.

## Parameters

`rebaseCssUrls(base)`

### base
Type: `String`

The new base url, comparing to initial file's src.

## Testing
Running the gulp file would concat `tests/input` files into `tests/actual` and compare the results to a static `tests/expected` directory, and make sure we got what we've expected.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Gulp](http://gulpjs.com/).

## Release History
 - 0.0.1 - Basic features.
 - 0.0.2 - Improved tests and added reporting.

## License
[MIT](https://github.com/welldone-software/gulp-bundle-file/blob/master/LICENSE)
