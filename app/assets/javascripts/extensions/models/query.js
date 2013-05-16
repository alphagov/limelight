define([
  'extensions/models/model'
],
function (Model) {
  var Query = Model.extend({
    
    setPeriod: function (periodName) {
      
      var period = this.periods[periodName];
      
      var endAt = period.boundary(this.moment());
      var startAt = endAt.clone().subtract(period.duration, periodName + 's');
      this.set({
        end_at: endAt,
        start_at: startAt,
        period: periodName
      });
    },
    
    periods: {
      week: {
        boundary: function (date) {
          return date.utc().day(1).startOf('day');
        },
        duration: 9
      },
      month: {
        boundary: function (date) {
          return date.utc().startOf('month');
        },
        duration: 12
      }
    }
  });
  
  return Query;
});
