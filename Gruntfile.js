var config = require('./config');
config.baseUrl = '';

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    clean: ["public/"],
    watch: {
      js: {
        files: [
          'app/**/*',
          'test/spec/**/*.js'
        ],
        tasks: ['forever:restart'],
        nospawn: true
      },
      css: {
        files: [
          'styles/**/*'
        ],
        tasks: ['sass'],
        nospawn: true
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/limelight.css': 'styles/index.scss'
        },
        options: {
          loadPath: [
            'govuk/toolkit/stylesheets',
            'govuk/static/vendor/assets/stylesheets',
            'govuk/static/app/assets/stylesheets'
          ],
          style: 'nested'
        }
      }
    },
    forever: {
      options: {
        index: 'app.js',
        logDir: 'log'
      }
    },
    jasmine: {
      limelight: {
        src: 'app/**/*.js',
        options: {
          specs: 'test/spec/**/spec.*.js',
          helpers: 'test/helpers/*.js',
          template: 'test/testrunner.html'
        }
      }
    },
    jshint: {
      options: {
        eqnull: true
      },
      all: [
        "app/extensions/**/*.js",
        "app/licensing/**/*.js"
      ]
    },
    copy: {
      debug: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              'govuk/static/app/assets/images/search-button.png',
              'govuk/static/app/assets/images/gov.uk_logotype-2x.png'
            ],
            dest: 'public/css/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: [
              'govuk/static/app/assets/images/favicon.ico'
            ],
            dest: 'public/',
            filter: 'isFile'
          }
        ]
      }
    }
  });
  
  [
    'grunt-forever',
    'grunt-contrib-watch',
    'grunt-contrib-jasmine',
    'grunt-contrib-jshint',
    'grunt-contrib-clean',
    'grunt-contrib-copy',
    'grunt-contrib-sass'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });
  
  // Default task.
  grunt.registerTask('build', ['clean', 'jshint', 'jasmine', 'sass', 'copy:debug']);
  grunt.registerTask('start', ['sass', 'forever:start', 'watch']);
  grunt.registerTask('stop', ['forever:stop']);
  grunt.registerTask('default', ['build']);

};

