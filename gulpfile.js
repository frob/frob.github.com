var gulp = require('gulp'),
    minimist = require('minimist'),
    swig = require('gulp-swig'),
    rename = require('gulp-rename');

var vfs = require('vinyl-fs');

gulp.task('default', function() {
  // do stuff
});

// Add a new post
gulp.task('new-draft', function() {
  var options = minimist(process.argv.slice(2));

  var date = new Date();
  var time = {
    year: date.getFullYear(),
    month: (date.getMonth() < 10 ) ? '0' + date.getMonth() : date.getMonth(),
    day: (date.getDay() < 10 ) ? '0' + date.getDay() : date.getDay(),
    toString: function() {
      return this.year + '-' + this.month + '-' + this.day;
    }
  }

  if (typeof options.title != 'undefined') {
    var title = options.title;
    var fullTitle = time.toString() + '-' + title.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.md';
    var options = {
      data: {
        title: title,
      }
    }

    return gulp.src('_templates/post.template')
      .pipe(swig(options))
      .pipe(rename(fullTitle))
      .pipe(vfs.dest('_drafts', { overwrite: false }));
  }
  else {
    console.log("Please enter a title");
  }
});
