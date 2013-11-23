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
  var path = require('path');

  function resetCounter() {
    return {
      loc: 0, sloc: 0, cloc: 0, scloc: 0, mcloc: 0, nloc: 0, file: 0
    };
  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sloc', 'Source lines of code', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      reportType: 'stdout',  //stdout, json
      reportPath: null,
      tolerant: false
    });

    var exts = [ 'js', 'cc', 'c', 'coffeescript', 'coffee', 'python', 'py', 'java', 'php' ];

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var count = resetCounter();
      var src = readDir.readSync(f.dest, f.orig.src, readDir.ABSOLUTE_PATHS);
          
      src.forEach(function(f) {
        var stats, source = fs.readFileSync(f, 'utf8');
        var ext = path.extname(f);

        if (!ext) {
          return;
        }

        ext = (ext.charAt(0) === '.') ? ext.substr(1, ext.length) : ext;

        if (options.tolerant === true) {
          if(exts.indexOf(ext) < 0 ) {
            ext = 'js';
          }
        } else {
          if (exts.indexOf(ext) < 0) {
            return;
          }
        }

        stats = sloc(source, ext);

        count.loc += stats.loc;
        count.sloc += stats.sloc;
        count.cloc += stats.cloc;
        count.scloc += stats.scloc;
        count.mcloc += stats.mcloc;
        count.nloc += stats.nloc;

        count.file ++;
      });
    
      if(options.reportType === 'stdout') {
        grunt.log.writeln('-------------------------------');
        grunt.log.writeln('        physical lines : '+ String(count.loc).green);
        grunt.log.writeln('  lines of source code : '+ String(count.sloc).green);
        grunt.log.writeln('         total comment : '+ String(count.cloc).cyan);
        grunt.log.writeln('            singleline : '+ String(count.scloc));
        grunt.log.writeln('             multiline : '+ String(count.mcloc));
        grunt.log.writeln('                 empty : '+ String(count.nloc).red);
        grunt.log.writeln('');
        grunt.log.writeln('  number of files read : '+ String(count.file).green);
        grunt.log.writeln( options.tolerant ? 
                          '         tolerant mode '.yellow : 
                          '           strict mode '.red );
        grunt.log.writeln('-------------------------------');
      } else if (options.reportType === 'json') {
        
        if (!options.reportPath) {
          grunt.log.warn('Please specify the reporting path.');
        }

        grunt.file.write(options.reportPath, JSON.stringify(count, null, 2));
        grunt.log.writeln('Create at: '+ options.reportPath.cyan);
      }

    });
  });

};
