define([
  'require',
  'common/date-range',
  'extensions/collections/collection'
],
function (require, dateRange, Collection) {
  /**
   * Retrieves data for a specific licence, grouped by authority,
   * for all authorities
   */
  var LicenceApplications = Collection.extend({
    
    initialize: function (models, options) {
      if (!options.groupBy) {
        throw "groupBy option is mandatory";
      }
      this.groupBy = options.groupBy;
      Collection.prototype.initialize.apply(this, arguments);
    },
    
    parse: function (response) {
      return response.data;
    },
    
    serviceName: 'licensing',
    apiName: 'application',
    
    queryId: 'applications-detail-lastweek',

    queryParams: function () {
      var lastWeek = dateRange.lastWeekDateRange(this.moment().utc());
      
      var params = {
        start_at: lastWeek.start_at,
        end_at: lastWeek.end_at,
        group_by: this.groupBy
      };
      
      return params;
    }
  });

  return LicenceApplications;
});
