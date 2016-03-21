import { expand, compact, flatten, frame, fromRDF, toRDF, normalize } from 'ember-jsonld';
import examples from '../library-examples';
import { module, test } from 'qunit';

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
