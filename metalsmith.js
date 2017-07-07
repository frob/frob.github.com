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
const fm = require('front-matter');
const md = require('marked');
const liquid = require('tinyliquid');
const path = require('path');
var writemetadata = require('metalsmith-writemetadata');
var consolodate = require('consolidate');
var each = require('async').each;

function debug(logToConsole) {
  return function(files, metalsmith, done) {
    if (logToConsole) {
      console.log('\nMETADATA:');
      console.log(metalsmith.metadata());

      // console.log('\nFILE:');
      // console.log(files[files.length - 1]);
      for (var f in files) {
        if (f == '2016-11-21-my-dilemma--what-technology-to-pursue/index.html') {
          console.log('\nFILE:');
          console.log(files[f]);
          // console.log('contents: ' + files[f].contents);
        }
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

        delete files[f].title;
        delete files[f].date;
        delete files[f].description;
        delete files[f].canonical;
        delete files[f].tags;
        delete files[f].category;
        delete files[f].assets;
      }

    done();
  };
};

function childLayout() {
  return function(files, metalsmith, done) {
    // var counter = 0;
    // for (var f in files) {
    // //   var frontMatter = fm('' + files[f].contents);
    // //   var wrapperTemplate = fs.readFileSync('./_layouts/' + frontMatter.attributes.layout + '.html', 'utf8');
    // //   var render = liquid.compile(wrapperTemplate);
    // //
    // //   var context = liquid.newContext({
    // //     locals: {
    // //       content: files[f].content,
    // //       page: files[f].page,
    // //       site: files[f].site
    // //     }
    // //   });
    // //
    // //   context.onInclude(function (name, callback) {
    // //     var extname = path.extname(name) ? '' : '.html';
    // //     var filename = path.resolve('_includes', name + extname);
    // //
    // //     fs.readFile(filename, {encoding: 'utf8'}, function (err, data){
    // //       if (err) {
    // //         return callback(err);
    // //       }
    // //       var inc = liquid.parse(data);
    // //       callback(null, inc);
    // //     });
    // //   });
    // //
    // //   render(context, function (err) {
    // //     if (err) {
    // //       console.error(err);
    // //     }
    // //     // console.log(context.getBuffer());
    // //     // console.log(files[f].contents.length);
    // //     files[f].contents = new Buffer('abc');//context.getBuffer());
    // //     // console.log(files[f].contents.length);
    // //     done();
    // //   });
    // // }
    //     }
      const wrapTemplate = function(f, done) {
        var frontMatter = fm('' + files[f].contents);

        var options = files[f];
        options.includeDir = './_includes';
        consolodate.liquid('./_layouts/' + frontMatter.attributes.layout + '.html',
          options,
          function (err, html) {
            if (err) {
              throw err;
            }

            files[f].contents = new Buffer(html);
            done();
        });
      };

      each(Object.keys(files), wrapTemplate, done)

  };
};
// Get load the jekyll config.
  const config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));

ms = Metalsmith(__dirname)
    .metadata({"site":config})
    .source('./_posts')            // source directory
    .destination('./_site')     // destination directory
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
    .use(childLayout())
    // .use(writemetadata())
    .use(debug(true))
    .clean(true)
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
