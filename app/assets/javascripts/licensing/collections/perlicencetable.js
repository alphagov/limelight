define([
  'require',
  'extensions/collection',
  'licensing/models/perlicencetablerow'
],
function (require, Collection, Model) {
  /**
   * Retrieves data for a specific licence, grouped by authority,
   * for all authorities
   */
  var LicenceApplications = Collection.extend({
    
    model: Model,
    
    initialize: function (models, options) {
      this.licenceUrlSlug = options.licenceUrlSlug;
      Collection.prototype.initialize.apply(this, arguments);
    },
    
    parse: function (response) {
      return response.data.values;
    },
    
    queryUrl: 'licensing',

    queryParams: function () {
      // add 1 day to correct for sun-sat week
      var end = this.moment().startOf('week').add(1, 'days');
      return {
        start_at: this.moment(end).subtract(1, 'weeks'),
        end_at: end,
        filter_by: this.licenceUrlSlug,
        group_by: 'authorityUrlSlug',
        collect: 'authorityName,licenceName',
        period: 'all'
      };
    }
    
  });

  return LicenceApplications;
});
