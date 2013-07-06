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

#### options.torelant
Type: `Boolean`
Default value: `false`

I set a generous analysis. The default is `false`.
If `true`, analyze the SLOC on the basis of all the files that you have specified, when any `false`, it is not specified, the analyzes only the extensions that are supported if.

### Usage Examples

#### Basic compression
This configuration will count line of the input files using the default options.

```js
grunt.initConfig({
  sloc: {
    files: {
      'path/to/target': [ 'lib/onlyMyLib.js', 'app/**.js' ],
      'path/to/others': [ '*.java', '*.coffee' ],
    }
  },
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

 number of files read  : 12
   strict(or torelant) mode
-------------------------------

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

**exported file example**

```js
{
  "loc": 72,    //physical lines
  "sloc": 45,   //lines of source code
  "cloc": 10,   //total comment
  "scloc": 10,  //singleline
  "mcloc": 0,   //multiline
  "nloc": 17,   //multiline
  "file": 22    //empty
}
```

### Supported Language
* CoffeeScript
* C / C++
* JavaScript
* Python
* Java
* PHP

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2013-07-04   v0.4.0   Support torelant mode.
* 2013-07-03   v0.3.0   More (strict) exactly analyze
* 2013-06-30   v0.2.2   Support report to exteranl file
* 2013-06-30   v0.1.0   First release for Grunt 0.4.1.
