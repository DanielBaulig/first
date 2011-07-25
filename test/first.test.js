var first = require('../lib/first');

exports.testFirst = function(t) {
  t.expect(1);
  first(function() {
    t.ok(true);
    t.done();
  });
};

exports.testThen = function (t) {
  t.expect(3);
  first(function() {
    t.ok(true);
    this();
  }).then(function() {
    t.ok(true);
    this();
  }).then(function() {
    t.ok(true);
    t.done();
  });
};

exports.testThenParameters = function (t) {
  t.expect(6);
  first(function(arg1, arg2) {
    t.strictEqual(arg1,  undefined);
    t.strictEqual(arg2, undefined);
    this('Hello, World!', true);
  }).then(function(arg1, arg2) {
    t.strictEqual(arg1, 'Hello, World!');
    t.strictEqual(arg2, true);
    this(42);
  }).then(function(arg1, arg2) {
    t.strictEqual(arg1, 42);
    t.strictEqual(arg2, undefined);
    t.done();
  });
};


exports.testWhilst = function (t) {
  t.expect(3);
  first(function() {
    t.ok(true);
    this();
  }).whilst(function() {
    t.ok(true);
    this();
  }).then(function() {
    t.ok(true);
    t.done();
  });
};

exports.testWhilstParameters = function (t) {
  t.expect(10);
  first(function(arg1, arg2) {
    t.strictEqual(arg1, undefined);
    t.strictEqual(arg2, undefined);
    this('Hello, World!', true);
  }).whilst(function(arg1, arg2) {
    t.strictEqual(arg1, undefined);
    t.strictEqual(arg2, undefined);
    this(42);
  }).then(function(fun1, fun2) {
    t.ok(fun1 instanceof Array);
    t.ok(fun2 instanceof Array);
    t.strictEqual(fun1[0], 'Hello, World!');
    t.strictEqual(fun1[1], true);
    t.strictEqual(fun2[0], 42);
    t.strictEqual(fun2[1], undefined);
    t.done();
  });
};


exports.testFlow = function (t) {
  t.expect(11);
  var n = 0;
  first(function() {
    t.equal(++n, 1);
    this();
  }).then(function() {
    t.ok(++n > 1);
    t.ok(n < 4);
    this(); 
  }).whilst(function() {
    t.ok(++n > 1);
    t.ok(n < 4);
    this();
  }).then(function() {
    t.equal(++n, 4);
    this();
  }).then(function() {
    t.ok(++n > 4);  
    t.ok(n < 7);  
    this();
  }).whilst(function() {
    t.ok(++n > 4);  
    t.ok(n < 7);  
    this();
  }).then(function() {
    t.equal(++n, 7);
    t.done();
  });
};
