# gulp-template-lint
Wrap of template-lint as a simple gulp plugin

## install
```
npm install gulp-template-lint
```

## usage

```
var linter = require('gulp-template-lint');

gulp.task('lint-template-html', function () {
    return gulp.src('**/*.html')
        .pipe(linter())
        .pipe(gulp.dest('output'));
});
 
```

## custom rules example

you can override the default set of rules by supplying an array of rules. You can also make your own

```
var gulp = require('gulp');
var gutil = require('gulp-util');
var parse5 = require('parse5');
var stream = require('stream');
var linter = require('gulp-template-lint');

var ParserRule = require('template-lint').ParserRule;

class AltRule {
    init(parser, state) {        
        var self = this;
        self.errors = [];
        parser.on('startTag', (name, attrs, selfClosing, location) => {
            if (name == 'foo' && state.scope == 'body' ) { 
                let error = "boo!... [line: " + location.line + "]";
                self.errors.push(error);                
            }
        });
    }
}

gulp.task('build-html', function () {
    return gulp.src('**/*.html')
        .pipe(linter([new AltRule(), new ParserRule()]))
        .pipe(gulp.dest('output'));
});