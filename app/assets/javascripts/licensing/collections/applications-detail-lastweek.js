define([
  'require',
  'extensions/collections/collection'
],
function (require, Collection) {
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
      var today = this.moment().utc();
      if (today.day() === 0) { // Sunday
          today = today.subtract(1, 'day');
      }

      var end = today.day(1).startOf('day');
      
      var params = {
        start_at: end.clone().subtract(1, 'weeks'),
        end_at: end,
        group_by: this.groupBy
      };
      
      return params;
    }
  });

  return LicenceApplications;
});
