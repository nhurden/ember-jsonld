/* jshint node: true */
'use strict';

var path = require('path');
var pickFiles = require('broccoli-static-compiler');

function EmberCLIJsonLd(project) {
  this.project = project;
  this.name    = 'Ember CLI jsonld';

  var tree = unwatchedTree('node_modules/ember-jsonld/dist');
  this.tree = pickFiles(tree, {
    srcDir: '.',
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

  this.app.import('vendor/ember-jsonld/named-amd/main.js', {
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
};

module.exports = EmberCLIJsonLd;
