# ember-jsonld

An Ember-friendly [jsonld.js][jsonld.js] wrapper.

* Returns [RSVP promises][RSVP].
* Can be installed as an Ember-CLI addon.

## Installation

### Ember CLI
`npm install --save-dev ember-jsonld`

### Bower
`bower install ember-jsonld`

## Usage (ember-cli)
ember-jsonld returns RSVP promises, so all RSVP.js features are available:
```js
import ld from 'ember-jsonld';

ld.expand(json).then(function(expanded) {
  // expansion success
}).catch(function(error) {
  // expansion error
}).finally(function() {
  // expansion success or failure
});

var hash = Ember.RSVP.hash({
  expanded: ld.expand(json),
  compacted: ld.compact(json, context),
  flattened: ld.flatten(json),
  framed: ld.frame(json, context)
});
```

## Contibuting
Installing dependencies and running tests:
```sh
npm install && npm test
```

[jsonld.js]: https://github.com/digitalbazaar/jsonld.js
[RSVP]: https://github.com/tildeio/rsvp.js
