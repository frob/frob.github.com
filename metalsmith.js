const Metalsmith  = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts     = require('metalsmith-layouts');
const markdown    = require('metalsmith-markdown');
const permalinks  = require('metalsmith-permalinks');
const nested = require('metalsmith-nested');
const date = require('metalsmith-jekyll-dates');
const yaml = require('js-yaml');
const fs   = require('fs');
const layoutsByName = require('metalsmith-layouts-by-name');
const fm = require('front-matter');
const md = require('marked');
const liquid = require('tinyliquid');
const path = require('path');
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
          console.log('contents: ' + files[f].contents);
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

function wrappingLayout() {
  return function(files, metalsmith, done) {
      const wrapTemplate = function(f, done) {
        var frontMatter = fm('' + files[f].contents);

        if ('layout' in frontMatter.attributes) {
          // var wrapperTemplate = fs.readFileSync('./_layouts/' + frontMatter.attributes.layout + '.html', 'utf8');
          // var render = liquid.compile(wrapperTemplate);
          // var context = liquid.newContext({
          //   locals: {
          //     content: frontMatter.body,
          //     page: files[f].page,
          //     site: metalsmith.metadata().site
          //   }
          // });
          // context.onInclude(function (name, callback) {
          //   var extname = path.extname(name) ? '' : '.html';
          //   var filename = path.resolve('./_includes/', name + extname);
          //
          //   fs.readFile(filename, {encoding: 'utf8'}, function (err, data){
          //     if (err) {
          //       return callback(err);
          //     }
          //     var inc = liquid.parse(data);
          //     callback(null, inc);
          //   });
          // });
          //
          // render(context, function (err) {
          //   if (err) {
          //     console.error(err);
          //   }
          //   // console.log(context.getBuffer());
          //   // console.log(files[f].contents.length);
          //   files[f].contents = new Buffer(context.getBuffer());
          //   // console.log(files[f].contents.length);
          //   done();
          // });

          var options = files[f];
          options.includeDir = '_includes';
          options.site = metalsmith.metadata().site;
          options.content = frontMatter.body;
          consolodate.liquid('./_layouts/' + frontMatter.attributes.layout + '.html',
            options,
            function (err, html) {
              if (err) {
                throw err;
              }

              files[f].contents = new Buffer(html);
              done();
          });
        } else {
          done();
        }
      };

      each(Object.keys(files), wrapTemplate, done)

  };
};

// Get load the jekyll config.
  var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
  config.time = new Date();

ms = Metalsmith(__dirname)
    .metadata({"site":config})
    .source('./_posts')
    .ignore([
      '_drafts',
      '_includes',
      '_layouts',
      '_scss',
      '_tasks',
      '_templates',
      '_test',
      '.*',
      'backstop.json',
      'backstop_data',
      '.git',
      '.travis.yml',
      'package.json,',
      'CNAME',
      '*.urls',
      'metalsmith.js',
      'README.md',
      '*.scss',
      'api',
      'assets',
      'images',
      'node_modules',
      'Gemfile',
      'Gruntfile.js',
      'googleb9297b879f594869'
    ])
    .destination('./_site')
    .use(collections({
      posts: '_posts/*.md'
    }))                         // use `collections.posts` in layouts
    .use(markdown())
    .use(permalinks({
      relative: false,
      pattern: config.permalink
    }))
    .use(date())
    .use(layoutsByName({
      directory: '_layouts'
    }))
    .use(jekyllAttributes())
    .use(layouts({
      engine: 'liquid',
      directory: '_layouts',
      includeDir: '_includes',
      pattern: ['**/*.md', '*.html']
    }))
    .use(wrappingLayout())
    .use(debug(true))
    .clean(true)
    .build(function(err) {
      if (err) {
        console.log(err);
        throw err;
      }       // error handling is required
    });
