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
      if (!options.groupBy) {
        throw "groupBy option is mandatory";
      }
      this.groupBy = options.groupBy;
      this.filterBy = options.filterBy;
      Collection.prototype.initialize.apply(this, arguments);
    },
    
    parse: function (response) {
      return response.data;
    },
    
    queryUrl: 'licensing',
    
    queryId: 'applications-detail-lastweek',

    queryParams: function () {
      // add 1 day to correct for sun-sat week
      var end = this.moment().startOf('week').add(1, 'days');
      var params = {
        start_at: this.moment(end).subtract(1, 'weeks'),
        end_at: end,
        group_by: this.groupBy,
        collect: ['authorityName', 'licenceName']
      };
      
      if (this.filterBy) {
        params.filter_by = _.map(this.filterBy, function(value, key) {
          return key + ':' + value;
        });
        
        if (params.filter_by.length === 1) {
          params.filter_by = params.filter_by[0];
        }
      }
      
      return params;
    },
    
    comparators: {
      group: function (attr, descending) {
        return this.defaultComparator(this.groupBy, descending);
      }
    }
    
  });

  return LicenceApplications;
});
