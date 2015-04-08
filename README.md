# gulp-bundle-file

> A [Gulp](http://gulpjs.com/) plugin for bundling js and css resources as an external reference.

## Overview

The plugin is minimalistic and simple. It generates the bundle file on the fly and adds it to the stream of files passing through it.

For example, the following folder structure:

```
+ src
    - file1.js
    + fldr
        - file1.js
        - file2.js
```

And gulp task: 

```js
gulp.task('bundle.js', function() {
    return gulp.src('src/**/*.js')
        .pipe(bundle('bundle.js', {
            type: 'js', //can be ommited, it is the default
            base: 'src'
        }))
        .pipe(gulp.dest('dst'));
});
```

Results in a directory like so:

```
+ dst
    - bundle.js
    - file1.js
    + fldr
        - file1.js
        - file2.js
```


And a bundle.js content like so:

```js
document.write('<script src="file1.js"></script>');
document.write('<script src="fldr/file1.js"></script>');
document.write('<script src="fldr/file2.js"></script>');
```

A css bundling task is similar and looks like this:

```js
gulp.task('bundle.css', function() {
    return gulp.src('src/**/*.css')
        .pipe(bundle('bundle.css', {
            type: 'css',
            base: 'src'
        }))
        .pipe(gulp.dest('dst'));
});
```

The content of the bundle.css is the following:

```css
@import url(file1.css);
@import url(fldr/file1.css);
@import url(fldr/file2.css);
```


## Parameters

`bundle(bundleName, options)`

### bundleName
Type: `String`

The name of the bundle file. 
This file is added to the stream of files passing through the plugin. It is a gulp only file, and must be saved using `gulp.dest` or a similar facility to be available in the file system. 

### options

#### options.emitInputFiles
Type: `Boolean`
Default value: `true`

By default, the plugin emits all input files before it emits the bundle file, so it add one file to the stream of files. Setting this option to `false`, will cause the plugin to filter out all input files and only emit the bundle file.

#### options.type
Type: `String`
Default value: `'js'`

Either 'js' or 'css'. Determine the type of the bundle file i.e wether it uses `<script src="">` or `<link rel="">` tag to reference the external files.

#### options.base
Type: `String`

The base to use for the bundle file and the input file. Determines the relative path used for the href and src attributes.



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Gulp](http://gulpjs.com/).

## Release History
 - 1.0.0 - Basic features.

## License
[MIT](https://github.com/welldone-software/gulp-bundle-file/blob/master/LICENSE)

