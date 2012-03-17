# _first_

first is a flow-control library for node. It provides a clean and easy to use interface for sequentializing and parallelizing asynchronous functions.

Example:

    var first = require('first');

    first(function() {
      fs.readFile('json-data', this);
    }).
    whilst(function () {
      templates.compile('a-template', this);
    }).
    then(function (json, template) {
      template[0].render(json[0], this);
    }).
    then(function (html) {
      console.log(html);
    });

# Installation

    npm install first

# Features
  * [Small](#small)
  * [Chainable & Readable](#chainable)
  * [Sequential & Parallel](#seqandpar)
  * [Sequence Parameters](#parameters)
  * [Ordered Parallel Paramters](#parpar)
  * [Batch Callbacks](#batch)
  * [Unit Tests](#tests)

## <a name="small" />Small
    
    $ stat -c "%s" ./lib/first.js 
    1736

## <a name="chainable" />Chainable & Readable

    first(function() {
      // first do something
      this();
    }).
    then(function () {
      // then do something else
    });

## <a name="seqandpar" />Sequential & Parallel

    first(function () {
      // first do something
      this();
    }).
    then(function () {
      // then do (parallel) job A
      this();
    }).
    whilst(function () {
      // whilst doing (parallel) job B
      this();
    }).
    then(function () {
      // then do something after A + B finished
    });

## <a name="parameters" />Sequence Parameters

    first(function () {
      // first do something yielding a result
      this(result);
    }).
    then(function (result) {
      // then do something with result
    });

## <a name="parpar" />(Ordered!) Parallel Parameters

    first(function () {
      // first do something yielding err and result
      this(err, result);
    }).
    whilst(function () {
      // whilst doing something that yields 'Hello, World!'
      this('Hello, World!');
    }).
    then(function (function1, function2) {
      // then do something with those results
      // function1[0] === err, function1[1] === result 
      // function2[0] === 'Hello, World!'
    });

## <a name="batch" />Batch Callbacks

    first(function () {
      // first do something
      this();
    }).
    then(function () {
      // then do something else
      this();
    }, function {
      // then do something else
      this();
    }).
    then(function () {
      // then do something else
      this();
    }).
    whilst(function () {
      // whilst doing something else
      this();
    }, function () {
      // whilst doing something else
      this();
    });

## <a name="tests" />Unit Tests

    make test


# License

Copyright (c) 2011 Daniel Baulig <daniel.baulig@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
