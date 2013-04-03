define([
  'licensing/collections/applications-detail-lastweek'
],
function (Collection, Applications) {
  describe("ApplicationsDetailLastWeek", function() {
    describe("queryParams", function() {
      it("requires a grouping criterion", function() {
        expect(function () {
          var collection = new Collection([], {});
        }).toThrow();
      });
      
      it("requests grouped data without a filter", function() {
        var collection = new Collection([], {
          groupBy: 'authorityUrlSlug'
        });
        spyOn(Collection.__super__, "moment");
        Collection.__super__.moment.plan = function () {
          var realMoment = collection.moment.originalValue;
          // set "now" to a fixed date to enable static expectations
          if (!arguments.length) {
            return realMoment('2013-03-13');
          }
          return realMoment.apply(null, arguments);
        }
      
        var params = collection.queryParams();
        expect(params.start_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-03-04T00:00:00');
        expect(params.end_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-03-11T00:00:00');
        expect(params.group_by).toEqual('authorityUrlSlug');
        expect(params.collect).toEqual(['authorityName', 'licenceName']);
        expect(params.filter_by).not.toBeDefined();
      });
      
      it("requests grouped data with a filter", function() {
        var collection = new Collection([], {
          groupBy: 'authorityUrlSlug',
          filterBy: {
            licenceUrlSlug: 'test-licence'
          }
        });
        spyOn(Collection.__super__, "moment");
        Collection.__super__.moment.plan = function () {
          var realMoment = collection.moment.originalValue;
          // set "now" to a fixed date to enable static expectations
          if (!arguments.length) {
            return realMoment('2013-03-13');
          }
          return realMoment.apply(null, arguments);
        }
      
        var params = collection.queryParams();
        expect(params.start_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-03-04T00:00:00');
        expect(params.end_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-03-11T00:00:00');
        expect(params.filter_by).toEqual('licenceUrlSlug:test-licence');
        expect(params.group_by).toEqual('authorityUrlSlug');
        expect(params.collect).toEqual(['authorityName', 'licenceName']);
      });
    });
    
    describe("comparators", function () {
      describe("group", function () {
        it("re-sorts data by the grouping criterion", function () {
          var collection = new Collection([
              { authorityUrlSlug: 'authority1', licenceUrlSlug: 'licence3' },
              { authorityUrlSlug: 'authority2', licenceUrlSlug: 'licence1' },
              { authorityUrlSlug: 'authority3', licenceUrlSlug: 'licence2' },
            ], {
            groupBy: 'authorityUrlSlug'
          });
          
          collection.sortByAttr('group', true);
          expect(collection.at(0).get('authorityUrlSlug')).toEqual('authority3');
          expect(collection.at(1).get('authorityUrlSlug')).toEqual('authority2');
          expect(collection.at(2).get('authorityUrlSlug')).toEqual('authority1');
          
          collection.groupBy = 'licenceUrlSlug';
          collection.sortByAttr('group', true);
          expect(collection.at(0).get('authorityUrlSlug')).toEqual('authority1');
          expect(collection.at(1).get('authorityUrlSlug')).toEqual('authority3');
          expect(collection.at(2).get('authorityUrlSlug')).toEqual('authority2');
        });
      });
    });
  });
});
