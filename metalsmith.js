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
const consolodate = require('consolidate');
const each = require('async').each;

function debug(logToConsole) {
  return function(files, metalsmith, done) {
    if (logToConsole) {
      console.log('\nMETADATA:');
      console.log(metalsmith.metadata());
      console.log(Object.keys(files));

      for (var f in files) {
        if (f == 'river/index.html') {
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
    const attachAttributes = function(f, done) {
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
      if (!('site' in files[f])) {
        files[f].site = metalsmith.metadata().site;

        if (!('posts' in files[f].site) && ('collections' in metalsmith.metadata()) && ('posts' in metalsmith.metadata().collections)) {
          for (post in metalsmith.metadata().collections.posts) {
            if (typeof post === Number) {
              files[f].site.posts[parseInt(post)] = metalsmith.metadata().collections.posts[post];
            }
          }
          files[f].site.posts = metalsmith.metadata().collections.posts;
        }
      }
      const pubDate = new Date(files[f].date);
      files[f].year = pubDate.getFullYear();
      files[f].month = pubDate.getMonth() < 9 ? "0" + parseInt(pubDate.getMonth() + 1) : pubDate.getMonth() + 1;
      files[f].day = pubDate.getUTCDate() < 9 ? "0" + pubDate.getUTCDate() : pubDate.getUTCDate();

      // delete files[f].title;
      // delete files[f].date;
      // delete files[f].description;
      // delete files[f].canonical;
      // delete files[f].tags;
      // delete files[f].category;
      // delete files[f].assets;

      done();
    };

    each(Object.keys(files), attachAttributes, done);
  };
};

function wrappingLayout() {
  return function(files, metalsmith, done) {
      const wrapTemplate = function(f, done) {
        var frontMatter = fm(files[f].contents.toString());
        const layout = ('layout' in files[f]) ? files[f].layout : ('layout' in frontMatter.attributes) ? frontMatter.attributes.layout : false;
        if (layout) {

          var options = files[f];
          options.includeDir = '_includes';
          options.site = metalsmith.metadata().site;
          options.content = frontMatter.body;
          consolodate.liquid('./_layouts/' + layout + ( layout.endsWith('html') ? '' : '.html'),
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

      each(Object.keys(files), wrapTemplate, done);
  };
};

function jekyllFiles() {
  return function(files, metalsmith, done) {
      const parseTemplate = function(f, done) {
        var template = files[f].contents.toString();
        var render = liquid.compile(template);
        var context = liquid.newContext({
          locals: {
            content: files[f].contents.toString(),
            page: files[f].page,
            site: metalsmith.metadata().site
          }
        });

        if (('collections' in metalsmith.metadata()) && ('posts' in metalsmith.metadata().collections)) {
          context._locals.site.posts = metalsmith.metadata().collections.posts;
        }

        if (f === 'river/index.html') console.log(context);
        context.onInclude(function (name, callback) {
          var extname = path.extname(name) ? '' : '.html';
          var filename = path.resolve('./_includes/', name + extname);

          fs.readFile(filename, {encoding: 'utf8'}, function (err, data){
            if (err) {
              return callback(err);
            }
            var inc = liquid.parse(data);
            callback(null, inc);
          });
        });

        render(context, function (err) {
          if (err) {
            console.error(err);
          }
          files[f].contents = new Buffer(context.getBuffer());

          done();
        });
      };
      each(Object.keys(files), parseTemplate, done);
  };
}

// Get load the jekyll config.
var config = yaml.safeLoad(fs.readFileSync('./_config.yml', 'utf8'));
config.time = new Date();

ms = Metalsmith(__dirname)
    .metadata({"site":config})
    .source('./')
    .ignore([
      '*.xml',
      '_drafts',
      '_includes',
      '_layouts',
      '_scss',
      '_tasks',
      '_templates',
      '_test',
      '_config.yml',
      '.*',
      'backstop.json',
      'backstop_data',
      '.git',
      '.travis.yml',
      'LICENSE',
      'package.json',
      'CNAME',
      '*.urls',
      'metalsmith.js',
      'README.md',
      'LICENCE',
      '*.scss',
      'api',
      'assets',
      'images',
      'node_modules',
      'Gemfile',
      'Gruntfile.js',
      'gulpfile.js',
      'googleb9297b879f594869.html'
    ])
    .destination('./_site')
    .use(collections({
      posts: {
        pattern: '_posts/*.md',
        refer: false,
        sortBy: 'date'
      }
      // @TODO: add tags
      // @TODO: add category
    }))
    .use(jekyllAttributes())
    .use(jekyllFiles())
    .use(markdown())
    .use(date())
    .use(permalinks({
      relative: false,
      pattern: ':title.html',
      date: 'YYYY',

      linksets: [{
        match: { collection: 'posts' },
        pattern: config.permalink,
        date: 'mmddyy'
      }]

    }))
    .use(layoutsByName({
      directory: '_layouts'
    }))
    .use(layouts({
      engine: 'liquid',
      directory: '_layouts',
      includeDir: '_includes',
      pattern: ['*.md', '*.html']
    }))
    .use(wrappingLayout())
    // .use(debug(true))
    .clean(true)
    .build(function(err) {
      // Error handling is required.
      if (err) {
        console.log(err);
        throw err;
      }
    });
