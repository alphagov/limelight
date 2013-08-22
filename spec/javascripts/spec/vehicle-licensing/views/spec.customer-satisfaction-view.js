define([
  'vehicle-licensing/views/customer-satisfaction-view',
  'vehicle-licensing/collections/customer-satisfaction'
],
function (View, Collection) {
  describe("getCurrentValue", function () {
    it('should return SORN satisfaction as a percentage', function() {
      var collection = buildCollection([
        { "satisfaction_sorn": 1.6 }
      ]);

      var view = new View({
        collection: collection,
        service: 'sorn'
      });

      expect(view.getCurrentValue()).toEqual("85%")
    });

    it('should return Tax Disc satisfaction as a percentage', function() {
      var collection = buildCollection([
        { "satisfaction_tax_disc": 1.4 }
      ]);

      var view = new View({
        collection: collection,
        service: 'tax-disc'
      });

      expect(view.getCurrentValue()).toEqual("90%")
    });

    it('should return rounded the percentage', function() {
      var collection = buildCollection([
        { "satisfaction_sorn": 1.99 }
      ]);

      var view = new View({
        collection: collection,
        service: 'sorn'
      });

      expect(view.getCurrentValue()).toEqual("75.3%")
    });

    it('should round to 2 decimal digits values below 10', function() {
      var collection = buildCollection([
        { "satisfaction_sorn": 4.65 }
      ]);

      var view = new View({
        collection: collection,
        service: 'sorn'
      });

      expect(view.getCurrentValue()).toEqual("8.75%")
    });

    it('should not round 100%', function() {
      var collection = buildCollection([
        { "satisfaction_sorn": 1 }
      ]);

      var view = new View({
        collection: collection,
        service: 'sorn'
      });

      expect(view.getCurrentValue()).toEqual("100%")
    });
  });

  function buildCollection(data) {
    var defaultDatum =         {
      "_timestamp": "1999-01-01T00:00:00+00:00",
      "satisfaction_tax_disc": 5,
      "satisfaction_sorn": 5
    };

    var response = {
      data: _.map(data, function (datum) { return _.extend(defaultDatum, datum); })
    };

    return new Collection(response, { parse: true });
  }

});
