/*
 * grunt-sloc
 * https://github.com/rhiokim/grunt-sloc
 *
 * Copyright (c) 2013 rhio kim
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    sloc: {
      options: {},
      main: {
        options: {},
        files: {
          'test/fixtures': [ '*' ]
        }
      },
      all_files: {
        options: {},
        files: {
          'test/fixtures': [ '**' ]
        }
      },
      specify_dir_js: {
        options: {},
        files: {
          'test/fixtures': [ '*.js' ]
        }
      },
      all_js: {
        options: {},
        files: {
          'test/fixtures': [ '**.js' ]
        }
      },
      sepcify_dir_all_js: {
        options: {},
        files: {
          'test/fixtures/sub1': [ '*.js' ],
          'test/fixtures/sub2': [ '**.js' ]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sloc', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
