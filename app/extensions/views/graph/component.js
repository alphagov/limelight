define([
  'extensions/views/view'
],
function (View) {
  
  var Component = View.extend({
    
    render: function () {
      View.prototype.render.apply(this, arguments);
      
      if (!this.componentWrapper) {
        var componentWrapper = this.componentWrapper = this.wrapper.append('g');
        if (this.classed){
          componentWrapper.classed(this.classed, true);
        }
      }
    }
    
  });

  return Component;
});
