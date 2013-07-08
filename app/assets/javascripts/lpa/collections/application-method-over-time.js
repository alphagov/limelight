define([
  'extensions/collections/graphcollection'
],
function (GraphCollection) {

  var ApplicationMethodCollection = GraphCollection.extend({

    serviceName: 'lpa',
    apiName: 'volumes',

    parse: function (response) {
      var items = {
        "non_digital": {},
        "digital": {}
      };
      _.each(response.data, function(d) {
        var item = {};
        var applicationMethod = this.getApplicationMethod(d.key);
        if (!applicationMethod) {
          return;
        }
        if (items[applicationMethod][d.start_at]) {
          items[applicationMethod][d.start_at].value += parseFloat(d.value);
        } else {
          items[applicationMethod][d.start_at] = {
            value: parseFloat(d.value),
            _start_at: this.moment(d.start_at).format(),
            _end_at: this.moment(d.end_at).format()
          };
        }
      }, this);
      return [
        {
          id: 'digital',
          title: 'digital',
          values: _.map(items.digital, function (v) { return v; })
        },
        {
          id: 'non_digital',
          title: 'non_digital',
          values: _.map(items.non_digital, function (v) { return v; })
        }
        
      ];
    },

    getApplicationMethod: function (applicationMethod) {
      if (applicationMethod === "property_and_financial_digital_applications"
        || applicationMethod === "health_and_welfare_digital_applications") {
        return "digital";
      } else if (applicationMethod === "property_and_financial_paper_applications"
        || applicationMethod === "health_and_welfare_paper_applications") {
        return "non_digital";
      }
    }

  });

  return ApplicationMethodCollection;
});
