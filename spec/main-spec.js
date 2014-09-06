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

  describe('jsonld.js features', function() {
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

  describe('RSVP.js features', function() {
    it('can catch errors', function(done) {
      ld.fromRDF(LIBRARY_NQUADS, {format: 'application/invalid'}).catch(function(error) {
        expect(error.name).toBe('jsonld.UnknownFormat');
      }).finally(function() {
        done();
      });
    });

    it('can combine promises as a hash', function(done) {
      var hash = Ember.RSVP.hash({
        expanded: ld.expand(LIBRARY),
        compacted: ld.compact(LIBRARY_EXPANDED, LIBRARY['@context']),
        flattened: ld.flatten(LIBRARY)
      });
      hash.then(function(hashValues) {
        expect(hashValues.expanded).toDeepEqual(LIBRARY_EXPANDED);
        expect(hashValues.compacted).toDeepEqual(LIBRARY_COMPACTED);
        expect(hashValues.flattened).toDeepEqual(LIBRARY_FLATTENED);
      }).finally(function() {
        done();
      });
    });

    describe('labelling promises', function() {
      it('labels expand', function(done) {
        var promise = ld.expand(LIBRARY);
        expect(promise._label).toBe('jsonld: Expand');
        done();
      });

      it('labels compact', function(done) {
        var promise = ld.compact(LIBRARY_EXPANDED, LIBRARY['@context']);
        expect(promise._label).toBe('jsonld: Compact');
        done();
      });

      it('labels flatten', function(done) {
        var promise = ld.flatten(LIBRARY);
        expect(promise._label).toBe('jsonld: Flatten');
        done();
      });

      it('labels frame', function(done) {
        var promise = ld.frame(LIBRARY, LIBRARY_FRAME);
        expect(promise._label).toBe('jsonld: Frame');
        done();
      });

      it('labels fromRDF', function(done) {
        var promise = ld.fromRDF(LIBRARY_NQUADS, {format: 'application/nquads'});
        expect(promise._label).toBe('jsonld: RDF to JSON-LD');
        done();
      });

      it('labels toRDF', function(done) {
        var promise = ld.toRDF(LIBRARY, {format: 'application/nquads'});
        expect(promise._label).toBe('jsonld: JSON-LD to RDF');
        done();
      });

      it('labels normalize', function(done) {
        var promise = ld.normalize(LIBRARY, {format: 'application/nquads'});
        expect(promise._label).toBe('jsonld: Normalize');
        done();
      });
    });
  });
});
