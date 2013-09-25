define([
  'extensions/collections/collection'
],
  function (Collection) {
    var HelpUsage = Collection.extend({

      serviceName:'lasting-power-of-attorney',
      apiName:'journey',

      queryParams: function () {
        return {
          period: 'week',
          duration: 1,
          ago: 0,
          filter_by: 'type:eventAction=help',
          group_by: 'eventLabel',
          collect: [
            'uniqueEvents'
          ]
        };
      },

      parse: function (response) {
      }
    });

    return HelpUsage;
  });
