define([
  'extensions/views/graph/graph'
],
function (Graph) {
  var ResponseTimeGraph = Graph.extend({

    valueAttr: 'avgresponse',
    numYTicks: 3,

    getConfigNames: function () {
      return ['stack', 'hour'];
    },

    getScaledTime: function (d) {
      if(d > 9999){
        return d.toString().slice(0,-3);
      }
      else{
        return d;
      }
    },

    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
        { view: this.sharedComponents.yaxis,options: {
            tickFormat: function () {
              return function (d) {
                /*return this.getScaledTime(d) + 'ms';*/
                if(d > 9999){
                  return d.toString().slice(0,-3) + 's';
                }
                else{
                  return d + 'ms';
                }
              };
            }
          }
        },
        {
          view: this.sharedComponents.stack,
          options: { drawCursorLine: true }
        },
        {
          view: this.sharedComponents.tooltip,
          options: {
            getValue: function (group, groupIndex, model, index) {
              return model.get(this.graph.valueAttr) + 'ms';
            }
          }
        },
        { view: this.sharedComponents.hover }
      ];
    }

  });

  return ResponseTimeGraph;
});
