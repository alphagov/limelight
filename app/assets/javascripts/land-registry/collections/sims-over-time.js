define([
  'extensions/collections/graphcollection'
],
function (GraphCollection) {

  var Collection = GraphCollection.extend({

    serviceName: 'hmrc_preview',
    apiName: 'volumes',

    parse: function (response) {
      var items = {
        "B2B": {},
        "BUSINESS_GATEWAY": {},
        "PORTAL_APPLICATION": {},
        "POSTAL_APPLICATION": {},
      };
      _.each(response.data, function(d) {
        for (var key in Object.keys(items)) {
          var service =  Object.keys(items)[key];
          items[service][d.start_at] = {
            _count: parseFloat(d[service].replace(",", "")),
            _start_at: this.moment(d.start_at),
            _end_at: this.moment(d.end_at)
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
          id: 'b2b',
          title: 'B2B',
          values: items.B2B
        },
        {
          id: 'businessGateway',
          title: 'Business Gateway',
          values: items.BUSINESS_GATEWAY
        },
        {
          id: 'portalApplications',
          title: 'Portal',
          values: items.PORTAL_APPLICATION
        },
        {
          id: 'postalApplications',
          title: 'Postal',
          values: items.POSTAL_APPLICATION
        }
      ];
    }

  });

  return Collection;
});
