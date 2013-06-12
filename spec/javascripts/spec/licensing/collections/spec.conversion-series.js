define([
  'licensing/collections/conversion-series'
], function(Collection) {
  describe("ConversionSeriesCollection", function() {
    describe("queryParams", function() {
      
      it("requests data for the last month by default", function() { 
        var collection = new Collection();
        
        setupMoment('2013-03-13', collection);
      
        var params = collection.queryParams();
        expect(params.start_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-02-01T00:00:00');
        expect(params.end_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-03-01T00:00:00');
        expect(params.filter_by).toEqual('dataType:licensing_overview_journey');
      });
      
      it("requests data for an earlier month", function() { 
        var collection = new Collection(null, {
          monthsAgo: 1
        });
        
        setupMoment('2013-03-13', collection);
      
        var params = collection.queryParams();
        expect(params.start_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-01-01T00:00:00');
        expect(params.end_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-02-01T00:00:00');
        expect(params.filter_by).toEqual('dataType:licensing_overview_journey');
      });
    });
    
    describe("Sorting", function() {
      it("should not change order if they follow the specified sort order", function() {
        var models = [
          {eventCategory: "licensingUserJourney:downloadFormPage", events: 54321},
          {eventCategory: "licensingUserJourney:submitApplicationPage", events: 4321},
          {eventCategory: "licensingUserJourney:feeInfoPage", events: 321}
        ];
        var collection = new Collection(models, {});

        expect(collection.at(0).get('eventCategory')).toEqual("licensingUserJourney:downloadFormPage");
        expect(collection.at(1).get('eventCategory')).toEqual("licensingUserJourney:submitApplicationPage");
        expect(collection.at(2).get('eventCategory')).toEqual("licensingUserJourney:feeInfoPage");
      });

      it("should reorder according to a provided sort order", function() {
        var models = [
          {eventCategory: "licensingUserJourney:submitApplicationPage", events: 4321},
          {eventCategory: "licensingUserJourney:downloadFormPage", events: 54321},
          {eventCategory: "licensingUserJourney:feeInfoPage", events: 321}
        ];
        var collection = new Collection(models, {});

        expect(collection.at(0).get('eventCategory')).toEqual("licensingUserJourney:downloadFormPage");
        expect(collection.at(1).get('eventCategory')).toEqual("licensingUserJourney:submitApplicationPage");
        expect(collection.at(2).get('eventCategory')).toEqual("licensingUserJourney:feeInfoPage");
      });

      it("should not include unrecognised keys", function() {
        var models = [
          {eventCategory: "afly_1", events: 4321},
          {eventCategory: "licensingUserJourney:downloadFormPage", events: 54321},
          {eventCategory: "licensingUserJourney:submitApplicationPage", events: 321}
        ];
        var collection = new Collection();
        collection.reset(collection.parse({data: models }));

        expect(collection.length).toEqual(2);
        expect(collection.at(0).get('eventCategory')).toEqual("licensingUserJourney:downloadFormPage");
        expect(collection.at(1).get('eventCategory')).toEqual("licensingUserJourney:submitApplicationPage");
      });

    })
  });
});