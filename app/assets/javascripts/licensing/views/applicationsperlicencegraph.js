define([
  'require',
  './applicationsgraph',
  'extensions/graph/line',
],
function (require, ApplicationsGraph, MultiLine) {
  var ApplicationsPerLicenceGraph = ApplicationsGraph.extend({
    
    components: function () {
      var components = ApplicationsGraph.prototype.components.apply(this, arguments);
      _.last(components).options = {
        classed: function (metaModel, index) {
          return 'line line' + index + ' ' + metaModel.get('id');
        },

        x: function (metaModel, model, index) {
          // display data points on sundays
          var x = this.moment(model.get('_end_at')).subtract(1, 'days');
          return this.scales.x(x.toDate());
        },
        y: function (metaModel, model, index) {
          return this.scales.y(model.get(metaModel.get('id')));
        }
      };
      return components;
    },
    
    calcYScale: function () {
      var collection = this.collection;
      var yScale = this.d3.scale.linear();
      var max = this.d3.max(collection.models, function (model) {
        return model.get('total');
      });
      var tickValues = this.calculateLinearTicks([0, max], 7);
      yScale.domain(tickValues.extent);
      yScale.rangeRound([this.innerHeight, 0]);
      yScale.tickValues = tickValues.values;

      return yScale;
    }
    
  });
  
  return ApplicationsPerLicenceGraph;
});
