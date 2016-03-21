import { expand, compact, flatten, frame, fromRDF, toRDF, normalize } from 'ember-jsonld';
import examples from '../library-examples';
import { module, test } from 'qunit';
import Ember from 'ember';

const { LIBRARY,
  LIBRARY_EXPANDED,
  LIBRARY_COMPACTED,
  LIBRARY_FLATTENED,
  LIBRARY_FRAMED,
  LIBRARY_FRAME,
  LIBRARY_NQUADS } = examples;

module('Unit | Main');

function functionalityTest(name, input, expected, func, ...args) {
  test(name, assert => {
    let done = assert.async();
    func(input, ...args).then(result => {
      assert.deepEqual(result, expected);
      done();
    });
  });
}

functionalityTest('Expanding'          , LIBRARY          , LIBRARY_EXPANDED  , expand);
functionalityTest('Compacting'         , LIBRARY_EXPANDED , LIBRARY_COMPACTED , compact   , LIBRARY['@context']);
functionalityTest('Flattening'         , LIBRARY          , LIBRARY_FLATTENED , flatten   , LIBRARY['@context']);
functionalityTest('Framing'            , LIBRARY          , LIBRARY_FRAMED    , frame     , LIBRARY_FRAME);
functionalityTest('N-Quads -> JSON-LD' , LIBRARY_NQUADS   , LIBRARY_EXPANDED  , fromRDF   , { format: 'application/nquads' });
functionalityTest('JSON-LD -> N-Quads' , LIBRARY          , LIBRARY_NQUADS    , toRDF     , { format: 'application/nquads' });
functionalityTest('Normalizing'        , LIBRARY          , LIBRARY_NQUADS    , normalize , { format: 'application/nquads' });

test('Catching Errors', assert => {
  let done = assert.async();
  fromRDF(LIBRARY_NQUADS, { format: 'application/invalid' }).catch(error => {
    assert.equal(error.name, 'jsonld.UnknownFormat');
    done();
  });
});

test('RSVP Hashes', assert => {
  let done = assert.async();
  let hash = Ember.RSVP.hash({
    expanded: expand(LIBRARY),
    compacted: compact(LIBRARY_EXPANDED, LIBRARY['@context']),
    flattened: flatten(LIBRARY, LIBRARY['@context'])
  });

  hash.then(function(hashValues) {
    assert.deepEqual(hashValues.expanded, LIBRARY_EXPANDED);
    assert.deepEqual(hashValues.compacted, LIBRARY_COMPACTED);
    assert.deepEqual(hashValues.flattened, LIBRARY_FLATTENED);
  }).finally(done);
});

function labelTest(name, input, expectedLabel, func, ...args) {
  test('Label | ' + name, assert => {
    let promise = func(input, ...args);
    assert.equal(promise._label, expectedLabel);
  });
}

labelTest('Expand'    , LIBRARY          , 'jsonld: Expand'         , expand);
labelTest('Compact'   , LIBRARY_EXPANDED , 'jsonld: Compact'        , compact   , LIBRARY['@context']);
labelTest('Flatten'   , LIBRARY          , 'jsonld: Flatten'        , flatten   , LIBRARY['@context']);
labelTest('Frame'     , LIBRARY          , 'jsonld: Frame'          , frame     , LIBRARY_FRAME);
labelTest('fromRDF'   , LIBRARY_NQUADS   , 'jsonld: RDF to JSON-LD' , fromRDF   , { format: 'application/nquads' });
labelTest('toRDF'     , LIBRARY          , 'jsonld: JSON-LD to RDF' , toRDF     , { format: 'application/nquads' });
labelTest('Normalize' , LIBRARY          , 'jsonld: Normalize'      , normalize , { format: 'application/nquads' });
