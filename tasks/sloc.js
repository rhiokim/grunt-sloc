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
  var AsciiTable = require('ascii-table');
  var path = require('path');

  function resetCounter() {
    return {
      total: 0,
      source: 0,
      comment: 0,
      single: 0,
      mixed: 0,
      empty: 0,
      block: 0,
      file: 0
    };
  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sloc', 'Source lines of code', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      reportType: 'stdout', //stdout, json
      reportPath: null,
      reportDetail: true,
      tolerant: false
    });

    var exts = ['js', 'javascript', 'cc', 'c', 'html', 'css', 'scss', 'coffeescript', 'coffee', 'python', 'py', 'java', 'php', 'php5', 'go', 'less'];

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var c, count = resetCounter();
      var src = readDir.readSync(f.dest, f.orig.src, readDir.ABSOLUTE_PATHS);

      src.forEach(function(f) {
        var stats, source = fs.readFileSync(f, 'utf8');
        var ext = path.extname(f).replace(/^./, '');
        var prop;

        if (!ext) {
          return;
        }

        if (!count.hasOwnProperty(ext)) {
          count[ext] = resetCounter();
        }

        if (options.tolerant === true) {
          if (exts.indexOf(ext) < 0) {
            ext = 'js';
          }
        } else {
          if (exts.indexOf(ext) < 0) {
            return;
          }
        }

        stats = sloc(source, ext);
        c = count[ext];
        c.file++;

        for (prop in stats) {
          c[prop] += stats[prop];
        }

        count.total += stats.total;
        count.source += stats.source;
        count.comment += stats.comment;
        count.single += stats.single;
        count.mixed += stats.mixed;
        count.empty += stats.empty;
        count.block += stats.block;

        count.file++;
      });

      if (options.reportType === 'stdout') {
        var table = new AsciiTable();
        table.removeBorder();

        table.addRow('physical lines', String(count.total).green);
        table.addRow('lines of source code', String(count.source).green);
        table.addRow('total comment', String(count.comment).cyan);
        table.addRow('singleline', String(count.single));
        table.addRow('multiline', String(count.mixed));
        table.addRow('empty', String(count.empty).red);
        table.addRow('', '');
        table.addRow('number of files read', String(count.file).green);
        table.addRow('mode', options.tolerant ? 'tolerant'.yellow : 'strict'.red);
        table.addRow('', '');

        grunt.log.writeln(' ');
        grunt.log.writeln(table.toString());

        if (options.reportDetail) {
          table = new AsciiTable();
          table.setHeading('extension', 'total', 'source', 'comment', 'single', 'mixed', 'empty', 'block');

          exts.forEach(function(ext) {
            c = count[ext];
            if (c) {
              table.addRow(ext, c.total, c.source, c.comment, c.single, c.mixed, c.empty, c.block);
            }
          });
          grunt.log.writeln(table.toString());
        }

        grunt.log.writeln(' ');
      } else if (options.reportType === 'json') {

        if (!options.reportPath) {
          grunt.log.warn('Please specify the reporting path.');
        }

        grunt.file.write(options.reportPath, JSON.stringify(count, null, 2));
        grunt.log.writeln('Create at: ' + options.reportPath.cyan);
      }

    });
  });

};