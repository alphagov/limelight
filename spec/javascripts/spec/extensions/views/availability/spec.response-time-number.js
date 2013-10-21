define([
  'extensions/views/availability/response-time-number',
  'extensions/collections/collection',
  'extensions/models/model'
],
  function (ResponseTimeNumber, Collection, Model) {

    describe("configuration", function () {

      function collectionForPeriod(period) {
        var CollectionWithPeriod =  Collection.extend({
          queryParams: function () {
            return {
              period: period
            };
          }
        });

        return new CollectionWithPeriod();
      }

      describe("getLabel", function() {
        it("display label for last 24 hours", function () {
          var view = new ResponseTimeNumber({
            collection: collectionForPeriod('hour')
          });

          expect(view.getLabel()).toEqual("mean for the last 24 hours");
        });

        it("display label for last 30 days", function () {
          var view = new ResponseTimeNumber({
            collection: collectionForPeriod('day')
          });

          expect(view.getLabel()).toEqual("mean for the last 30 days");
        });
      });


      describe("getLabelSelected", function () {
         it("display hour range and day for hour query", function () {
           var view = new ResponseTimeNumber({
             collection: collectionForPeriod('hour')
           });

           var selection = new Model();
           selection.set('_start_at', moment('2013-06-18T01:00:00+00:00').utc());
           selection.set('_end_at', moment('2013-06-18T02:00:00+00:00').utc());

           expect(view.getLabelSelected({ selectedModel: selection })).toEqual('1am to 2am,<br>18 June 2013');
         });

        it("display only date for day query", function () {
           var view = new ResponseTimeNumber({
             collection: collectionForPeriod('day')
           });

           var selection = new Model();
           selection.set('_start_at', moment('2013-05-17T00:00:00+00:00').utc());
           selection.set('_end_at', moment('2013-05-18T00:00:00+00:00').utc());

           expect(view.getLabelSelected({ selectedModel: selection })).toEqual('17 May 2013');
         });
      });
    });
  });
