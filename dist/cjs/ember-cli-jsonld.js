"use strict";
'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLIJsonLd(project) {
  this.project = project;
  this.name    = 'Ember CLI jsonld';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLIJsonLd.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'ember-jsonld', name);

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
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
};

module.exports = EmberCLIJsonLd;