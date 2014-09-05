define("ember-jsonld/ember-cli-jsonld",
  [],
  function() {
    "use strict";
    /* jshint node: true */
    'use strict';

    var path = require('path');
    var pickFiles = require('broccoli-static-compiler');

    function EmberCLIJsonLd(project) {
      this.project = project;
      this.name    = 'Ember CLI jsonld';

      var tree = unwatchedTree('node_modules/ember-jsonld');
      this.tree = pickFiles(tree, {
        srcDir: '.',
        files: ['dist/named-amd/*.js',
                'node_modules/jsonld/js/jsonld.js',
                'node_modules/es6-promise/dist/*.js'],
        destDir: 'ember-jsonld'
      });
    }

    function unwatchedTree(dir) {
      return {
        read:    function() { return dir; },
        cleanup: function() { }
      };
    }


    EmberCLIJsonLd.prototype.treeFor = function treeFor(name) {
      if (name === "vendor") {
        return this.tree;
      }
    };

    EmberCLIJsonLd.prototype.included = function included(app) {
      this.app = app;

      this.app.import('vendor/ember-jsonld/dist/named-amd/main.js', {
        exports: {
          'ember-jsonld': [
            'expand',
            'compact',
            'flatten',
            'frame',
            'fromRDF',
            'toRDF',
            'normalize'
          ]
        }
      });

      //es6-promise needs to be imported before jsonld.js
      this.app.import({
        development: 'vendor/ember-jsonld/node_modules/es6-promise/dist/promise-1.0.0.js',
        production: 'vendor/ember-jsonld/node_modules/es6-promise/dist/promise-1.0.0.min.js',
      });

      this.app.import('vendor/ember-jsonld/node_modules/jsonld/js/jsonld.js');
    };

    module.exports = EmberCLIJsonLd;
  });
define("ember-jsonld",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var slice = Array.prototype.slice;

    function expand(input) {
      if (arguments.length < 1) {
        throw new TypeError('Could not expand, too few arguments.');
      }
      return promisify(jsonld.expand, slice.call(arguments));
    }

    __exports__.expand = expand;function compact(input, ctx) {
      if (arguments.length < 2) {
        throw new TypeError('Could not compact: too few arguments.');
      }
      var compactFn = function(input, ctx, options, callback) {
        // ensure only one value is returned in callback
        jsonld.compact(input, ctx, options, function(err, compacted) {
          callback(err, compacted);
        });
      };
      return promisify(compactFn, slice.call(arguments));
    }

    __exports__.compact = compact;function flatten(input) {
      if (arguments.length < 1) {
        throw new TypeError('Could not flatten: too few arguments.');
      }
      return promisify(jsonld.flatten, slice.call(arguments));
    }

    __exports__.flatten = flatten;function frame(input, aFrame) {
      if (arguments.length < 2) {
        throw new TypeError('Could not frame: too few arguments.');
      }
      return promisify(jsonld.frame, slice.call(arguments));
    }

    __exports__.frame = frame;function fromRDF(dataset) {
      if (arguments.length < 1) {
        throw new TypeError('Could not convert from RDF: too few arguments.');
      }
      return promisify(jsonld.fromRDF, slice.call(arguments));
    }

    __exports__.fromRDF = fromRDF;function toRDF(input) {
      if (arguments.length < 1) {
        throw new TypeError('Could not convert to RDF: too few arguments.');
      }
      return promisify(jsonld.toRDF, slice.call(arguments));
    }

    __exports__.toRDF = toRDF;function normalize(input) {
      if (arguments.length < 1) {
        throw new TypeError('Could not normalize: too few arguments.');
      }
      return promisify(jsonld.normalize, slice.call(arguments));
    }

    __exports__.normalize = normalize;function promisify(fn, args) {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        fn.apply(null, args.concat(function(err, value) {
          if(!err) {
            resolve(value);
          } else {
            reject(err);
          }
        }));
      });
    }
  });