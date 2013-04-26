module.exports = function(grunt) {
	"use strict";

  // Project configuration.
  grunt.initConfig({
    clean: ["public/"],
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
    jshint: {
      options: {
        eqnull: true
      },
      all: [
        "extensions/**/*.js",
        "licensing/**/*.js"
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['clean', 'sass', 'copy:debug']);

};

