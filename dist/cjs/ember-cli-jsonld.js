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