'use strict';

var rework = require('rework'),
    url = require('rework-plugin-url'),
    through = require('through2'),
    path = require('path');

module.exports = function(base){
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            return; // ignore
        }
        if (file.isStream()){
            return this.emit('error', PluginError('gulp-rebase-css-urls',  'Streaming not supported'));
        }
        var adjusted = adjust(file);
        //console.log(adjusted);
        file.contents = new Buffer(adjusted);
        this.push(file);
        cb();
    });

    function adjust(file){
        var prefix = path.relative(base, path.dirname(file.path));
        var css = file.contents.toString();
        return rework(css)
            .use(url(function(url) {
                if(!path.isAbsolute(url) && !/^(data)/.test(url)){
                    url = path.join(prefix, url);
                    url = path.normalize(url).replace(/\\/g, '/');
                }
                return url;
            }))
            .toString();
    }
};