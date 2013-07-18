define([
  'require',
  'common/date-range',
  './all-entities'
],
function (require, dateRange, AllEntitiesCollection) {

  var Top5Collection = AllEntitiesCollection.extend({
    
    queryId: 'applications-top5-lastweek',

    queryParams: function () {
      var params = AllEntitiesCollection.prototype.queryParams.apply(this, arguments);
      var lastWeek = dateRange.lastWeekDateRange(this.moment().utc());

      return _.extend(params, {
        start_at: lastWeek.start_at,
        end_at: lastWeek.end_at,
        limit: 5,
        sort_by: '_count:descending'
      });
      
      return params;
    }
  });

  return Top5Collection;
});
