var distes6 = require('broccoli-dist-es6-module');
module.exports = distes6('lib', {
  global: 'jsonld',
  packageName: 'ember-jsonld',
  main: 'main',
  shim: {
    'ember': 'Ember'
  }
});
