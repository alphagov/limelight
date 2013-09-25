define([
  'lpa/collections/help-usage'
],
  function (Collection) {
    describe("LPA Help Usage Collection", function () {

      describe("queryParams", function () {

        it("queries for help usage in the last week", function () {
          var params = new Collection().queryParams();

          expect(params).toEqual({
            period: 'week',
            duration: 1,
            ago: 0,
            filter_by: 'type:eventAction=help',
            group_by: 'eventLabel',
            collect: [
              'uniqueEvents'
            ]
          });
        });
      });

      describe("parse", function () {
        it("parses usage response", function () {
          var response = {
            "data": [
              {
                "timeSpan":"week",
                "dataType":"lpa_journey",
                "eventCategory":"stageprompt.lpa",
                "eventAction":"help",
                "eventLabel":"help1",
                "_timestamp":"2013-06-30T23:00:00+00:00",
                "uniqueEvents":123
              },
              {
                "timeSpan":"week",
                "dataType":"lpa_journey",
                "eventCategory":"stageprompt.lpa",
                "eventAction":"help",
                "eventLabel":"help2",
                "_timestamp":"2013-06-30T23:00:00+00:00",
                "uniqueEvents":456
              },
              {
                "timeSpan":"week",
                "dataType":"lpa_journey",
                "eventCategory":"stageprompt.lpa",
                "eventAction":"help",
                "eventLabel":"help3",
                "_timestamp":"2013-06-30T23:00:00+00:00",
                "uniqueEvents":789
              }
            ]
          };

          var collection = new Collection(response, { parse: true });

          expect(collection.length).toEqual(3);

          expect(collection.at(0).get('helpName')).toEqual('help1');
          expect(collection.at(0).get('count')).toEqual(123);
          expect(collection.at(1).get('helpName')).toEqual('help2');
          expect(collection.at(1).get('count')).toEqual(456);
          expect(collection.at(2).get('helpName')).toEqual('help3');
          expect(collection.at(2).get('count')).toEqual(789);
        });
      });
    });
  });

