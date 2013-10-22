define([
  'extensions/collections/graphcollection'
],
function (GraphCollection) {

  var Collection = GraphCollection.extend({

    serviceName: 'land-registry',
    apiName: 'search-volumes',

    parse: function (response) {
      var items = {
        "sims_B2B_applications": {},
        "sims_business_gateway_applications": {},
        "sims_portal_applications": {},
        "sims_postal_applications": {}
      };
      _.each(response.data, function(d) {
        for (var key in Object.keys(items)) {
          var service =  Object.keys(items)[key];
          items[d.key][d._month_start_at] = {
            _count: parseFloat(d.value),
            _start_at: this.moment(d._month_start_at),
            _end_at: this.moment(d._timestamp)
          };
        }
      }, this);
      _.each(items, function(group, key, items) {
        var sorted = _.sortBy(group, function(item) {
          return +item._end_at * -1;
        });
        items[key] = sorted;
      });
      return [
        {
          id: 'portalApplications',
          title: 'Portal',
          values: items.sims_portal_applications
        },
        {
          id: 'postalApplications',
          title: 'Postal',
          values: items.sims_postal_applications
        },
        {
          id: 'b2b',
          title: 'B2B',
          values: items.sims_B2B_applications
        },
        {
          id: 'businessGateway',
          title: 'Business Gateway',
          values: items.sims_business_gateway_applications
        }
      ];
    }

  });

  return Collection;
});
