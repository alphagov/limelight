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

    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
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
        {
          view: this.sharedComponents.stack,
          options: {
            drawCursorLine: true,
            y: function(model) {
              return this.scales.y(model.yUptime0 + model.yUptime);
            },
            y0: function (model) {
              return this.scales.y(model.yUptime0);
            },
            outStack: function (model, y0, y) {
              model.yUptime0 = y0;
              model.yUptime = y;
            }
          }
        },
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
