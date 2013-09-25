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
    });
  });

