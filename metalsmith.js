const Metalsmith  = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts     = require('metalsmith-layouts');
const markdown    = require('metalsmith-markdown');
const permalinks  = require('metalsmith-permalinks');
const nested = require('metalsmith-nested');
const date = require('metalsmith-jekyll-dates');
const yaml = require('js-yaml');
const fs   = require('fs');
// const debug = require('metalsmith-debug');
const layoutsByName = require('metalsmith-layouts-by-name');

function debug(logToConsole) {
  return function(files, metalsmith, done) {
    if (logToConsole) {
      console.log('\nMETADATA:');
      console.log(metalsmith.metadata());

      for (var f in files) {
        console.log('\nFILE:');
        console.log(files[f]);
        console.log('contents: ' + files[f].contents)
      }
    }

    done();
  };
};

function jekyllAttributes() {
  return function(files, metalsmith, done) {
      for (var f in files) {
        files[f].content = files[f].contents;
        files[f].page = {
          title: files[f].title,
          date: files[f].date,
          description: files[f].description,
          canonical: files[f].canonical,
          tags: files[f].tags,
          category: files[f].category,
          assets: files[f].assets
        }
      }

    done();
  };
};

// Get load the jekyll config.
  const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

ms = Metalsmith(__dirname)
    .metadata({"site":config})
    .source('./_posts')            // source directory
    .destination('./_site')     // destination directory
    .clean(true)                // clean destination before
    // .use(collections({          // group all blog posts by internally
    //   posts: 'posts/*.md'       // adding key 'collections':'posts'
    // }))                         // use `collections.posts` in layouts
    .use(markdown())            // transpile all md into html
    .use(permalinks({           // change URLs to permalink URLs
      relative: false,         // put css only in /css
      pattern: config.permalink
    }))
    .use(date())
    .use(layoutsByName({
      directory: '_layouts'
    }))
    // .use(nested({
    //   directory: '_layouts'
    // }))
    .use(jekyllAttributes())
    .use(layouts({              // wrap layouts around html
      engine: 'liquid',     // use the layout engine you like
      directory: '_layouts',
      includeDir: '_includes'
    }))
    .use(debug(true))
    .build(function(err) {      // build process
      if (err) throw err;       // error handling is required
    });

// {
//   "source": "./_posts",
//   "destination": "./_site",
//   "metadata": {
//     "title": "My Jekyll-Powered Blog",
//     "description": "My second, super-cool, Jekyll-powered blog."
//   },
//   "plugins": {
//     "metalsmith-drafts": {},
//     "metalsmith-markdown": {},
//     "metalsmith-permalinks": {
//       "pattern": ":title"
//     },
//     "metalsmith-layouts": {
//       "engine": "swig",
//       "directory": "_layouts"
//     }
//   }
// }
