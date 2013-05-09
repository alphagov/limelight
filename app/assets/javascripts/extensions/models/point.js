define([
  'extensions/models/model'
],
function (Model) {
  
  var Point = Model.extend({
    
    // initialize: function () {
    //   Model.prototype.initialize.apply(this, arguments);
    // },
    // 
    distance: function (point) {
      return Math.sqrt(
        Math.pow(this.get('x') - point.get('x'), 2),
        Math.pow(this.get('y') - point.get('y'), 2)
      );
    }
    
  });
  
  return Point;
});
