define([
  'extensions/views/graph/interleavedbar'
],
function (InterleavedBar) {
  var ConversionBar = InterleavedBar.extend({
    interactive: true,
    strokeAlign: 'inner',
    
    blockMarginFraction: 0,
    barMarginFraction: 0,

    yStack: function (model) {
      return model.get('uniqueEvents');
    },
    blockWidth: function (model, i) {
      return this.scales.x(1) - this.scales.x(0);
    },
    text: function (model, i) {
      return Math.round(100 * model.get('uniqueEvents') / this.scales.y.domain()[1]) + '%';
    }
  });

  return ConversionBar;
});
