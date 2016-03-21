describe('ember-jsonld', function() {
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
