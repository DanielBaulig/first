/*jshint eqeqeq:true, proto:true, laxcomma:true, undef:true, node:true, expr: true, boss:true*/

var slice = Array.prototype.slice;

module.exports = function first (f) {
  var functions = [{f: f}], next = function () {
    var f, p = [];

    // get the first function
    if (f = functions.shift()) {
      p.push(f);
    } else {
      return;
    }

    // keep getting functions with the p flag set (parallelize)
    while(functions[0] && functions[0].p) {
      p.push(functions.shift());
    }

    // if there more than one function to run in parallel
    if (p.length > 1) {
      var  i = p.length
        , n = i
        , results = []
        // bucket creates a callback, that counts how often it was called
        // and will in turn fire a callback if a certain threshold is reached.
        // It also makes sure "results" (callback arguments) are kept in
        // order.
        , bucket = function (store) {
          
        return function () {
          results[store] = (slice.apply(arguments));
          if (!--n) {
            // thrshold was reached, call next!
            next.apply(this, results); 
          }
        };

      };

      while(i--) {
        // now run all functions simultaniously, giving them their respective
        // bucket and the arguments that where given to this call to next.
        p[i].f.apply(bucket(i), arguments);
      }

    } else {
      // if there's only one, simply run it, giving it next as this
      // and the arguments given to this call to next as arguments.
      p[0].f.apply(next, arguments);
    }
  };

  var deferred = {
    then: function(f) {
      functions.push({f: f});
      return this;
    },
    whilst: function(f) {
      functions.push({f: f, p: true});
      return this;
    }
  };

  process.nextTick(next);

  return deferred;
};
