define([
  'extensions/views/timeseries-graph/timeseries-graph'
],
function (TimeseriesGraph) {
  var ResponseTimeGraph = TimeseriesGraph.extend({

    getConfigName: function () {
      return 'hour';
    },

    components: function () {
      return [
        {
          view: this.sharedComponents.xaxis,
          options: {
            tickValues: function () {
              var count = this.collection.first().get('values').length;
              var values = this.collection.first().get('values').filter(function (model, index) {
                return (count - 1 - index) % 6 === 0;
              });
              return _.map(values, this.getTick);
            }
          }
        },
        {
          view: this.sharedComponents.yaxis,
          options: {
            ticks: 5
          }
        },
        { view: this.sharedComponents.line },
        { view: this.sharedComponents.hover }
      ];
    },

    calcXScale: function () {
      var start, end, xScale;
      
      var total = this.collection.first().get('values');
      
      start = moment(total.first().get('_timestamp'));
      end = moment(total.last().get('_timestamp'));
      
      xScale = this.d3.time.scale();
      xScale.domain([start.toDate(), end.toDate()]);
      xScale.range([0, this.innerWidth]);

      return xScale;
    },

    onChangeSelected: function () {

    },

    valueAttr: 'avgresponse'

  });

  return ResponseTimeGraph;
});
