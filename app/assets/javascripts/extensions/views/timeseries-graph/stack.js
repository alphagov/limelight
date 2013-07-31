define([
  'extensions/views/graph/stack'
],
function (Stack) {
  var TimeseriesStack = Stack.extend({
    
    interactive: true,
    
    configs: {
      hour: {
        x: function (model, index) {
          var x = this.moment(model.get('_end_at'));
          return Math.floor(this.scales.x(x.toDate())) + 0.5;
        }
      },
      week: {
        x: function (model, index) {
          // display data points on sundays
          var x = this.moment(model.get('_end_at')).subtract(1, 'days');
          return this.scales.x(x.toDate());
        }
      },
      month: {
        x: function (model, index) {
          return this.scales.x(index);
        }
      }
    },
    
    yStack: function (model) {
      return model.get(this.graph.valueAttr);
    }
  });
  
  return TimeseriesStack;
});
