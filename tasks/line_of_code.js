/*
 * grunt-sloc
 * https://github.com/rhiokim/grunt-sloc
 *
 * Copyright (c) 2013 rhio kim
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs');
  var sloc = require('sloc');
  var readDir = require('readdir');

  var count = {
    loc: 0,
    sloc: 0,
    cloc: 0,
    scloc: 0,
    mcloc: 0,
    nloc: 0,
    file: 0
  };

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sloc', 'Source lines of code', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var src = readDir.readSync(f.dest, f.orig.src, readDir.ABSOLUTE_PATHS);
          src.forEach(function(f) {
            var source = fs.readFileSync(f, 'utf8');
            var stats = sloc(source, 'javascript');

            count.loc += stats.loc;
            count.sloc += stats.sloc;
            count.cloc += stats.cloc;
            count.scloc += stats.scloc;
            count.mcloc += stats.mcloc;
            count.nloc += stats.nloc;

            count.file ++;
          });

    });

    grunt.log.writeln('-------------------------------');
    grunt.log.writeln('        physical lines : '+ '%s'.green, count.loc);
    grunt.log.writeln('  lines of source code : '+ '%s'.green, count.sloc);
    grunt.log.writeln('         total comment : '+ '%s'.cyan, count.cloc);
    grunt.log.writeln('            singleline : '+ '%s', count.scloc);
    grunt.log.writeln('             multiline : '+ '%s', count.mcloc);
    grunt.log.writeln('                 empty : '+ '%s'.red, count.nloc);
    grunt.log.writeln('');
    grunt.log.writeln(' number of files read  : '+ '%s'.green, count.file);
    grunt.log.writeln('-------------------------------');
  });

};
