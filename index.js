/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-jsonld',

  init: function(name) {
    var extension = path.join('jsonld', 'js', 'jsonld.js');
    this.treePaths['vendor'] = require.resolve('jsonld').replace(extension, '');
  },

  included: function(app, parentAddon) {
    app.import('vendor/jsonld/js/jsonld.js')
  }
};
