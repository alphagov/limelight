define([
  'extensions/views/timeseries-graph/timeseries-graph',
  'extensions/views/graph/stackedbar'
],
function (TimeseriesGraph, StackedBar) {
  var UptimeGraph = TimeseriesGraph.extend({

    getConfigName: function () {
      return 'hour';
    },

    minYDomainExtent: 1,

    yAxisInstance: function() {
      return this.componentInstances[0];
    },

    components: function () {
      return [
        {
          view: this.sharedComponents.yaxis,
          options: {
            ticks: 3,
            tickFormat: function () {
              return function (d) {
                return Math.round(100 * d) + '%';
              };
            }
          }
        },
        { view: this.sharedComponents.stack },
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

    valueAttr: 'uptimeFraction'

  });

  return UptimeGraph;
});
