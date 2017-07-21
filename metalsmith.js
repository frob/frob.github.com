const Metalsmith  = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts     = require('metalsmith-layouts');
const markdown    = require('metalsmith-markdown');
const permalinks  = require('metalsmith-permalinks');
// const nested = require('metalsmith-nested');
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

var extend = require('extend');
var multimatch = require('multimatch');
var unique = require('uniq');
var read = require('fs').readFileSync;
var loadMetadata = require('read-metadata').sync;

function debug(logToConsole) {
  return function(files, metalsmith, done) {
    if (logToConsole) {
      console.log('\nMETADATA:');
      console.log(metalsmith.metadata());
      console.log(Object.keys(files));

      for (var f in files) {
        if (f == 'posts/nan/nan/nan/back-from-drupalconla-a-postmortem.html/index.html') {
          console.log('\nFILE:');
          // console.log(files[f]);
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
      // const fixCollectionMetainfo = function(tag) {
      //   for (i in files[f].site.tags[tag]) {
      //     if (typeof files[f].site.tags[tag][i] != 'undefined') {
      //       files[f].site.tags[tag][i].url = 'mambajamba';
      //     }
      //     console.log(files[f].site.tags[tag][i]);
      //   }
      // };
      // each(Object.keys(files[f].site.tags), fixCollectionMetainfo);

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
          context._locals.site.tags = metalsmith.metadata().collections;
        }
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

function jekylleCollections() {
  return function(files, metalsmith, done) {
      const attachCollections = function(f, done) {
        if (!('site' in files[f])) {
          files[f].site = metalsmith.metadata().site;
        }
        if (typeof files[f].tags != 'undefined' && files[f].tags != null) {
          if (typeof files[f].collection == 'undefined') {
            files[f].collection = ['posts'];
          }
          files[f].tags.map(function (i) {
            files[f].collection.push(i);
          });
          done();
        }
        else {
          done();
        }
      };

      each(Object.keys(files), attachCollections, done);
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
    .use(jekylleCollections())
    .use(modCollections({
      posts: {
        pattern: '_posts/*.md',
        refer: false,
        sortBy: 'date',
        reverse: true
      },
      frontpage: {
        refer: false,
        sortBy: 'date',
        reverse: true
      },
      rants: {
        refer: false,
        sortBy: 'date',
        reverse: true
      },
      quarzack13: {
        refer: false,
        sortBy: 'date',
        reverse: true
      },
      tutorials: {
        refer: false,
        sortBy: 'date',
        reverse: true
      }
      // @TODO: add tags
      // @TODO: add category
    }))
    .use(jekyllFiles())
    .use(jekyllAttributes())
    .use(markdown())
    .use(date())
    .use(layoutsByName({
      directory: '_layouts'
    }))
    .use(layouts({
      engine: 'liquid',
      directory: '_layouts',
      includeDir: '_includes',
      pattern: ['*.md']
    }))
    .use(permalinks({
      relative: false,
      pattern: ':title.html',
      date: 'YYYY',

      linksets: [{
        match: { collection: 'posts' },
        pattern: config.permalink
      },{
        match: { collection: 'frontpage' },
        pattern: config.permalink
      }]
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


/**
 * modules
 */
function modCollections(opts){
  opts = normalize(opts);
  var keys = Object.keys(opts);
  var match = matcher(opts);

  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();

    /**
     * Find the files in each collection.
     */

    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      var data = files[file];
console.log(files[file]);
      data.url = data.path = file;
      data.content = md(data.contents.toString());

      match(file, data).forEach(function(key){
        if (key && keys.indexOf(key) < 0){
          opts[key] = {};
          keys.push(key);
        }

        metadata[key] = metadata[key] || [];
        metadata[key].push(data);
      });
    });

    /**
     * Ensure that a default empty collection exists.
     */

    keys.forEach(function(key) {
      metadata[key] = metadata[key] || [];
    });

    /**
     * Sort the collections.
     */

    keys.forEach(function(key){
      debug('sorting collection: %s', key);
      var settings = opts[key];
      var sort = settings.sortBy || 'date';
      var col = metadata[key];

      if ('function' == typeof sort) {
        col.sort(sort);
      } else {
        col.sort(function(a, b){
          a = a[sort];
          b = b[sort];
          if (!a && !b) return 0;
          if (!a) return -1;
          if (!b) return 1;
          if (b > a) return -1;
          if (a > b) return 1;
          return 0;
        });
      }

      if (settings.reverse) col.reverse();
    });

    /**
     * Add `next` and `previous` references and apply the `limit` option
     */

    keys.forEach(function(key){
      debug('referencing collection: %s', key);
      var settings = opts[key];
      var col = metadata[key];
      var last = col.length - 1;
      if (opts[key].limit && opts[key].limit < col.length) {
          col = metadata[key] = col.slice(0, opts[key].limit);
          last = opts[key].limit - 1;
      }
      if (settings.refer === false) return;
      col.forEach(function(file, i){
        if (0 != i) file.previous = col[i-1];
        if (last != i) file.next = col[i+1];
      });
    });

    /**
     * Add collection metadata
     */

    keys.forEach(function(key){
      debug('adding metadata: %s', key);
      var settings = opts[key];
      var col = metadata[key];
      col.metadata = (typeof settings.metadata === 'string') ?
        loadMetadata(settings.metadata) :
        settings.metadata;
    });

    /**
     * Add them grouped together to the global metadata.
     */

    metadata.collections = {};
    keys.forEach(function(key){
      return metadata.collections[key] = metadata[key];
    });

    done();
  };
}

/**
 * Normalize an `options` dictionary.
 *
 * @param {Object} options
 */

function normalize(options){
  options = options || {};

  for (var key in options) {
    var val = options[key];
    if ('string' == typeof val) options[key] = { pattern: val };
    if (val instanceof Array) options[key] = { pattern: val };
  }

  return options;
}

/**
 * Generate a matching function for a given set of `collections`.
 *
 * @param {Object} collections
 * @return {Function}
 */

function matcher(cols){
  var keys = Object.keys(cols);
  var matchers = {};

  keys.forEach(function(key){
    var opts = cols[key];
    if (!opts.pattern) {
      return;
    }
    matchers[key] = {
      match: function(file) {
        return multimatch(file, opts.pattern)
      }
    };
  });

  return function(file, data){
    var matches = [];

    if (data.collection) {
      var collection = data.collection;
      if (!Array.isArray(collection)) {
        collection = [collection];
      }
      collection.forEach(function(key){
        matches.push(key);

        if (key && keys.indexOf(key) < 0) {
          debug('adding new collection through metadata: %s', key);
        }
      });
    }

    for (var key in matchers){
      var m = matchers[key];
      if (m.match(file).length) {
        matches.push(key);
      }
    }

    data.collection = unique(matches);
    return data.collection;
  };
}
