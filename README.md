# grunt-sloc

> It's SLOC plugin for Grunt.js. based on [sloc](https://npmjs.org/package/sloc)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sloc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sloc');
```

## The "sloc" task

### Overview
In your project's Gruntfile, add a section named `sloc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sloc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.reportType
Type: `String`
Default value: `stdout`

It will generate a JSON file SLOC analysis results. The default value is `stdout`.
If we do not specify, in the case of the `stdout`, If you are prompted to enter the `json` and output to the CLI on the json file.

#### options.reportPath
Type: `String`
Default value: ``

I specify the path where you output the JSON file. Create the root folder if you do not specify if.

#### options.reportDetail
Type: `Boolean`
Default value: `true`

If `true`

```shell
//default reports

//and detail reports
.-----------------------------------------------------------------------.
| extension | total | source | comment | single | mixed | empty | block |
|-----------|-------|--------|---------|--------|-------|-------|-------|
| js        |    11 |      8 |       2 |      2 |     0 |     1 |     0 |
| css       |     8 |      7 |       0 |      0 |     0 |     1 |     0 |
| less      |   235 |    152 |      45 |     30 |     0 |    38 |    15 |
'-----------------------------------------------------------------------'
```

#### options.tolerant
Type: `Boolean`
Default value: `false`

Set as `false` to analyze only files with a subset of popular extensions.  `true` to analyze files with *any* file extension.  The default is `false`.

If `true`, the SLOC will be executed on all of the files specified, regardless of file extension.  With 'tolerant' set to `false`, or 'tolerant' unspecified, only supported file extensions will be analyzed.

#### options.alias
Type: `Object`
Default value: `null`

Custom ext to act like standard ext.

eg.

```js
{
  php5: 'php',
  less: 'css',
  vm: 'html'
}
```


### Usage Examples

#### Basic SLOC
This configuration will count line of the input files using the default options.

```js
grunt.initConfig({
  sloc: {
    'my-source-files': {
      files: {
        'path/to/target': [ 'lib/onlyMyLib.js', 'app/**.js' ],
        'path/to/others': [ '*.java', '*.coffee' ],
      }
    }
  }
})
```

**result**

```
...

Running "sloc" (sloc) task
-------------------------------

        physical lines : 51
  lines of source code : 29
         total comment : 6
            singleline : 6
             multiline : 0
                 empty : 16

  number of files read : 12
                  mode : strict(or torelant) 
                  
.-----------------------------------------------------------------------.
| extension | total | source | comment | single | mixed | empty | block |
|-----------|-------|--------|---------|--------|-------|-------|-------|
| js        |    11 |      8 |       2 |      2 |     0 |     1 |     0 |
| css       |     8 |      7 |       0 |      0 |     0 |     1 |     0 |
| less      |   235 |    152 |      45 |     30 |     0 |    38 |    15 |
'-----------------------------------------------------------------------'

...
```

#### Custom Options

<!--
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`
-->

```js
grunt.initConfig({
  sloc: {
    options: {
      reportType: 'json',
      reportPath: 'path/to/sloc-v<%= pkg.version %>.json',
    },
    files: {
      'path/to/target': [ 'lib/onlyMyLib.js', 'app/**.js' ],
      'path/to/others': [ '*.java', '*.coffee' ]
    },
  },
})
```

**result**

```js
{
  "createdAt": "2015-03-19T03:35:53.326Z",
  "total": {
    "total": 5,
    "source": 4,
    "comment": 1,
    "single": 1,
    "block": 0,
    "mixed": 0,
    "empty": 0,
    "file": 3
  },
  "targets": [
    "report_to_json"
  ],
  "data": {
    "report_to_json": {
      "total": 5,
      "source": 4,
      "comment": 1,
      "single": 1,
      "block": 0,
      "mixed": 0,
      "empty": 0,
      "file": 3,
      "js": {
        "total": 5,
        "source": 4,
        "comment": 1,
        "single": 1,
        "block": 0,
        "mixed": 0,
        "empty": 0,
        "file": 3
      },
      "createdAt": "2015-03-19T03:35:53.326Z"
    }
  }
}
```

### Supported Language
* [https://github.com/flosse/sloc#supported-languages](https://github.com/flosse/sloc#supported-languages)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2016-04-16  v0.7.0  Update modules
* 2014-02-15  v0.6.0  Support less.
* 2014-02-15  v0.5.1  Update Supporting languages table
* 2014-02-15  v0.5.0  Support HTML, CSS
* 2013-07-04  v0.4.0  Support torelant mode.
* 2013-07-03  v0.3.0  More (strict) exactly analyze
* 2013-06-30  v0.2.2  Support report to exteranl file
* 2013-06-30  v0.1.0  First release for Grunt 0.4.1.
