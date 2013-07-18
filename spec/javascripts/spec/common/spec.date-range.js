define([
    'common/date-range'
],
function (dateRange) {
    describe("Date range commons", function(){
      describe("Last week date range", function(){
        it("should return last week start and end date", function(){
          var today = moment( '2013-05-13 06:45:00');
          expect(dateRange.lastWeekDateRange(today).start_at.format('YYYY-MM-DDTHH:mm:ssZZ')).toEqual('2013-05-06T00:00:00+0000');
          expect(dateRange.lastWeekDateRange(today).end_at.format('YYYY-MM-DDTHH:mm:ssZZ')).toEqual('2013-05-13T00:00:00+0000');
        });

        it("should return correct start and end date for Sunday", function(){
          var today = moment('2013-03-17 06:45:00');
          expect(dateRange.lastWeekDateRange(today).start_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-03-04T00:00:00');
          expect(dateRange.lastWeekDateRange(today).end_at.format('YYYY-MM-DDTHH:mm:ss')).toEqual('2013-03-11T00:00:00');
        });
      });
    });
}
);