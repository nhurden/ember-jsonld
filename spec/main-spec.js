describe('ember-jsonld', function() {
  beforeEach(function() {
    jasmine.addMatchers({
      toDeepEqual: function() {
        return {
          compare: function(actual, expected) {
            return {
              pass: _.isEqual(actual, expected)
            };
          }
        };
      }
    });
  });

  it('defines ld', function() {
    expect(ld).toBeDefined();
  });

  it('can expand', function(done) {
    ld.expand(LIBRARY).then(function(result) {
      expect(result).toDeepEqual(LIBRARY_EXPANDED);
      done();
    });
  });

  it('can compact', function(done) {
    ld.compact(LIBRARY_EXPANDED, LIBRARY['@context']).then(function(result) {
      expect(result).toDeepEqual(LIBRARY_COMPACTED);
      done();
    });
  });

  it('can flatten', function(done) {
    ld.flatten(LIBRARY).then(function(result) {
      expect(result).toDeepEqual(LIBRARY_FLATTENED);
      done();
    });
  });

  it('can frame', function(done) {
    ld.frame(LIBRARY, LIBRARY_FRAME).then(function(result) {
      expect(result).toDeepEqual(LIBRARY_FRAMED);
      done();
    });
  });

  it('can convert from N-Quads to JSON-LD', function(done) {
    ld.fromRDF(LIBRARY_NQUADS, {format: 'application/nquads'}).then(function(result) {
      expect(result).toDeepEqual(LIBRARY_EXPANDED);
      done();
    });
  });

  it('can convert from JSON-LD to N-Quads', function(done) {
    ld.toRDF(LIBRARY, {format: 'application/nquads'}).then(function(result) {
      expect(result).toDeepEqual(LIBRARY_NQUADS);
      done();
    });
  });

  it('can normalize', function(done) {
    ld.normalize(LIBRARY, {format: 'application/nquads'}).then(function(result) {
      expect(result).toDeepEqual(LIBRARY_NQUADS);
      done();
    });
  });
});
