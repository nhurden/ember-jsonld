# ember-jsonld
An Ember-friendly [jsonld.js][jsonld.js] wrapper.

* Returns [RSVP promises][RSVP].
* Can be installed as an Ember-CLI addon.

## Installation
`ember install ember-jsonld`

## Usage
```js
import { expand, compact, flatten, frame, toRDF, normalize } from 'ember-jsonld';

expand(json).then(function(expanded) {
  // expansion success
}).catch(function(error) {
  // expansion failure
}).finally(function() {
  // expansion success or failure
});

var hash = Ember.RSVP.hash({
  expanded: expand(json),
  compacted: compact(json, context),
  flattened: flatten(json),
  framed: frame(json, frame),
  nquads: toRDF(json, {format: 'application/nquads'}),
  normalized: normalize(json, {format: 'application/nquads'})
});
```

## Contributing
Installing dependencies and running tests:
```sh
npm install && npm test
```

[jsonld.js]: https://github.com/digitalbazaar/jsonld.js
[RSVP]: https://github.com/tildeio/rsvp.js
