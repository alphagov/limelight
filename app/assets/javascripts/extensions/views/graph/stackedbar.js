define([
  'require',
  './interleavedbar'
],
function(require, InterleavedBarComponent) {
  var StackedBarComponent = InterleavedBarComponent.extend({
    
    align: 'centre',

    y0: function (groupIndex, modelIndex) {
      return this.graph.getY0Pos(groupIndex, modelIndex);
    }
    
  });

  return StackedBarComponent;
});