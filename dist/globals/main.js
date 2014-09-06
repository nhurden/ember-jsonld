!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ld=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var slice = Array.prototype.slice;

function expand(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not expand, too few arguments.');
  }
  return promisify(jsonld.expand, slice.call(arguments), 'Expand');
}

exports.expand = expand;function compact(input, ctx) {
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

exports.compact = compact;function flatten(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not flatten: too few arguments.');
  }
  return promisify(jsonld.flatten, slice.call(arguments), 'Flatten');
}

exports.flatten = flatten;function frame(input, aFrame) {
  if (arguments.length < 2) {
    throw new TypeError('Could not frame: too few arguments.');
  }
  return promisify(jsonld.frame, slice.call(arguments), 'Frame');
}

exports.frame = frame;function fromRDF(dataset) {
  if (arguments.length < 1) {
    throw new TypeError('Could not convert from RDF: too few arguments.');
  }
  return promisify(jsonld.fromRDF, slice.call(arguments), 'RDF to JSON-LD');
}

exports.fromRDF = fromRDF;function toRDF(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not convert to RDF: too few arguments.');
  }
  return promisify(jsonld.toRDF, slice.call(arguments), 'JSON-LD to RDF');
}

exports.toRDF = toRDF;function normalize(input) {
  if (arguments.length < 1) {
    throw new TypeError('Could not normalize: too few arguments.');
  }
  return promisify(jsonld.normalize, slice.call(arguments), 'Normalize');
}

exports.normalize = normalize;function formatLabel(label) {
  if (label) {
    return 'jsonld: ' + label;
  } else {
    return 'jsonld';
  }
}

function promisify(fn, args, label) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    fn.apply(null, args.concat(function(err, value) {
      if(!err) {
        resolve(value);
      } else {
        reject(err);
      }
    }));
  }, formatLabel(label));
}
},{}]},{},[1])
(1)
});