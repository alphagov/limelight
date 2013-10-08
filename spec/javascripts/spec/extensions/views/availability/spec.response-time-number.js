define([
  'extensions/views/availability/response-time-number',
  'extensions/collections/collection'
],
  function (Number, Collection) {

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

      describe("label", function() {
        it("display label for last 24 hours", function () {
          var view = new Number({
            collection: collectionForPeriod('hour')
          });

          expect(view.getLabel()).toEqual("mean for the last 24 hours");
        });

        it("display label for last 30 days", function () {
          var view = new Number({
            collection: collectionForPeriod('day')
          });

          expect(view.getLabel()).toEqual("mean for the last 30 days");
        });
      });

    });
  });
