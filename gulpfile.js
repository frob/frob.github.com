var gulp = require('gulp'),
    minimist = require('minimist'),
    swig = require('gulp-swig'),
    rename = require('gulp-rename'),
    taskListing = require('gulp-task-listing');

var vfs = require('vinyl-fs');

gulp.task('help', taskListing);

gulp.task('default', function() {
  // do stuff
});

// Add a new post
gulp.task('new-draft', function() {
  var options = minimist(process.argv.slice(2));

  if (typeof options.date == 'undefined') {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var time = {
      year: date.getFullYear(),
      month: (month < 10 ) ? '0' + month : month,
      day: (day < 10 ) ? '0' + day : day,
      toString: function() {
        return this.year + '-' + this.month + '-' + this.day;
      }
    }
  }
  else {
    var time = { toString: function() { return options.date; }};
  }

  if (typeof options.title != 'undefined') {
    var title = options.title;
    var fullTitle = time.toString() + '-' + title.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.md';
    var swigOptions = {
      data: {
        title: title,
        date: time.toString(),
        body: options.body
      }
    }
console.log(date.getMonth());
console.log(fullTitle);
    // return gulp.src('_templates/post.template')
    //   .pipe(swig(swigOptions))
    //   .pipe(rename(fullTitle))
    //   .pipe(vfs.dest('_drafts', { overwrite: false }));
  }
  else {
    console.log("Please enter a title");
  }
});

gulp.task('publish-draft', function() {
  var options = minimist(process.argv.slice(1));

  return gulp.src('_drafts/' + options.draft)
    .pipe(vfs.dest('_posts', {overwrite: options.overwrite | false}));
})
