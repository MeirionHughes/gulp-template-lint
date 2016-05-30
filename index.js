var gulp = require('gulp');
var gutil = require('gulp-util');
var Linter = require('template-lint').Linter;
var SelfCloseRule = require('template-lint').SelfCloseRule;
var ParserRule = require('template-lint').ParserRule;

module.exports = function (rules) {

    if (!rules)
        rules = [
            new SelfCloseRule(),
            new ParserRule()];

    var linter = new Linter(rules);

    function sanitize(file, cb) {

        var html = String(file.contents);

        linter
            .lint(html)
            .then((errors) => {
                errors.forEach((error) => {
                    gutil.log('WARNING', error,
                        file.path.substring(file.cwd.length, file.path.Length));
                });
            })
            .then(() => { cb(null, file) });
    }
    return require('event-stream').map(sanitize);
}