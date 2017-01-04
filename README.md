# viz.js-cli-wrapper

[![build status](https://img.shields.io/travis/jeysal/viz.js-cli-wrapper.svg?style=flat-square)](https://travis-ci.org/jeysal/viz.js-cli-wrapper)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/jeysal/viz-js-cli-wrapper.svg?style=flat-square&label=windows+build)](https://ci.appveyor.com/project/jeysal/viz-js-cli-wrapper)
[![code coverage](https://img.shields.io/codecov/c/github/jeysal/viz.js-cli-wrapper.svg?style=flat-square)](https://codecov.io/gh/jeysal/viz.js-cli-wrapper)

[![npm package](https://img.shields.io/npm/v/viz.js-cli-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/viz.js-cli-wrapper)
[![license](https://img.shields.io/github/license/jeysal/viz.js-cli-wrapper.svg?style=flat-square)](https://github.com/jeysal/viz.js-cli-wrapper/blob/master/LICENSE)

A command line interface wrapped around [viz.js](https://github.com/mdaines/viz.js).

Provides a cross-platform way to use core [GraphViz](http://www.graphviz.org/) features with similar command line syntax.

## Installation

### npm

You can install it using [Node.js](https://nodejs.org/) version 5 or higher and [npm](https://www.npmjs.com/), globally on your system

    npm install -g viz.js-cli-wrapper

or locally for your package

    npm install --save viz.js-cli-wrapper

## Usage

### Executables

The package provides six GraphViz-like executables:  
* `circo`
* `dot`
* `fdp`
* `neato`
* `osage`
* `twopi`

If you chose to install globally, npm should have already made them available on your PATH so you can run them everywhere.  
If you need to locate them, `npm bin -g` will point you to their location (usually `/usr/bin`, or `%APPDATA%/npm` on Windows).

If you installed locally, running `npm bin` in your package will print their location, usually `node_modules/.bin`.

### Command-line interface

The command line interface is very similar to that of GraphViz itself, however,
options are limited as viz.js does not support the whole range of GraphViz' features.

The following GraphViz options are currently supported:
* `-K`
* `-T`
* `-V`
* `-o`
* input files

For the full help text containing further information, run any of the executables with the `-h` flag, e.g. `dot -h`.

### Exit codes

* `2` - invalid CLI usage
* `70` - failed to read an input file
* `80` - failed to write to the output file
* `100` - rendering error from viz.js

## PlantUML

A common use case for GraphViz is generating UML diagrams via [PlantUML](http://plantuml.com).
As a Java application, PlantUML is nicely portable and runs on all platforms, however,
its dependency to GraphViz' dot engine makes the setup on different platforms annoying.

Using viz.js-cli-wrapper, you can easily set it up anywhere. If you installed it globally,
depending on your system PlantUML might just locate the dot executable out of the box.
In any case, you can [tell PlantUML where to find it](http://plantuml.com/command_line.html)
using the GRAPHVIZ_DOT environment variable or the -graphvizdot CLI switch.

See the [Executables section](#executables) on where to find the viz.js-cli-wrapper executables.
On Windows, you need to specify the path to "dot.cmd" including the ending, otherwise PlantUML will not find it.

## Credits

A huge thanks to [Mike Daines](https://github.com/mdaines) for making GraphViz to some extent portable with [viz.js](https://github.com/mdaines/viz.js)!

## License

viz.js-cli-wrapper is [MIT-licensed](https://github.com/jeysal/viz.js-cli-wrapper/blob/master/LICENSE).
