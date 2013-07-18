define([
  'require',
  './all-entities'
],
function (require, AllEntitiesCollection) {
  var Top5Collection = AllEntitiesCollection.extend({
    
    queryId: 'applications-top5-lastweek',

    queryParams: function () {
      var params = AllEntitiesCollection.prototype.queryParams.apply(this, arguments);
      var today = this.moment().utc();
      if (today.day() === 0) { // Sunday
          today = today.subtract(1, 'day');
      }
      
      var end = today.day(1).startOf('day');
      return _.extend(params, {
        start_at: end.clone().subtract(1, 'weeks'),
        end_at: end,
        limit: 5,
        sort_by: '_count:descending'
      });
      
      return params;
    }
  });

  return Top5Collection;
});
