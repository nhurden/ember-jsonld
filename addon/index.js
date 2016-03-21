import Ember from 'ember';

var slice = Array.prototype.slice;

export function expand(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not expand, too few arguments.');
  }
  return promisify(jsonld.expand, slice.call(arguments), 'Expand');
}

export function compact(input, ctx) {
  if (arguments.length < 2) {
    throw new TypeError('Could not compact: too few arguments.');
  }
  var compactFn = function(input, ctx, options, callback) {
    // ensure only one value is returned in callback
    jsonld.compact(input, ctx, options, function(err, compacted) {
      callback(err, compacted);
    });
  };
  return promisify(compactFn, slice.call(arguments), 'Compact');
}

export function flatten(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not flatten: too few arguments.');
  }
  return promisify(jsonld.flatten, slice.call(arguments), 'Flatten');
}

export function frame(input, aFrame) {
  if (arguments.length < 2) {
    throw new TypeError('Could not frame: too few arguments.');
  }
  return promisify(jsonld.frame, slice.call(arguments), 'Frame');
}

export function fromRDF(dataset) {
  if (arguments.length < 1) {
    throw new TypeError('Could not convert from RDF: too few arguments.');
  }
  return promisify(jsonld.fromRDF, slice.call(arguments), 'RDF to JSON-LD');
}

export function toRDF(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not convert to RDF: too few arguments.');
  }
  return promisify(jsonld.toRDF, slice.call(arguments), 'JSON-LD to RDF');
}

export function normalize(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not normalize: too few arguments.');
  }
  return promisify(jsonld.normalize, slice.call(arguments), 'Normalize');
}

function formatLabel(label) {
  if (label) {
    return 'jsonld: ' + label;
  } else {
    return 'jsonld';
  }
}

function promisify(fn, args, label) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    fn.apply(null, args.concat(function(error, value) {
      Ember.run(function() {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    }));
  }, formatLabel(label));
}
