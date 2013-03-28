define([
  'require',
  './applications'
],
function (require, Applications) {
  /**
   * Retrieves data for a specific licence, grouped by authority,
   * for the "top 5" authorities
   */
  var LicenceApplications = Applications.extend({
    
    queryParams: function () {
      return _.extend(Applications.prototype.queryParams.call(this, arguments), {
        group_by: 'authorityUrlSlug',
        limit: 5,
        sort_by: '_count:descending',
        collect: 'authorityName,licenceName'
      });
    }
  });

  return LicenceApplications;
});
