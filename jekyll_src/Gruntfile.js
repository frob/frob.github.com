module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'assets/js/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jekyll: {                             // Task
      options: {                          // Universal options
        bundleExec: true,
        src : '<%= app %>'
      },
      dist: {                             // Target
        options: {                        // Target options
          dest: '<%= dist %>',
          config: '_config.yml,_config.build.yml'
        }
      },
      serve: {                            // Another target
        options: {
          dest: '.jekyll',
          drafts: true
        }
      }
    },

    shipit: {
      default: {
        workspace: '_site/',
        deployTo: '~/frob.github.com',
        // repositoryUrl: pkg.repository.url,
        ignores: ['Gruntfile.js', 'node_modules', 'package.json'],
        keepReleases: 3,
        staging: {
          servers: ['deploy@frankrobertanderson.com']
        }
      }
    }
  });

  grunt.initConfig({
});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jekyll');

  // deployment tasks
  grunt.loadNpmTasks('grunt-shipit');
  grunt.loadNpmTasks('shipit-deploy');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('pwd', function() {
    grunt.shipit.remote('pwd', this.async());
  });

};
