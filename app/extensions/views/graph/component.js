define([
  'extensions/views/view'
],
function (View) {
  
  var Component = View.extend({
    
    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      
      if (_.isFunction(this.interactive)) {
        this.graph.on('hover', function () {
          if (this.interactive.apply(this, arguments)) {
            this.onHover.apply(this, arguments);
          }
        }, this);
      } else if (this.interactive === true) {
        this.graph.on('hover', this.onHover, this);
      }
      
      this.collection.on('change:selected', this.onChangeSelected, this);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      
      if (!this.componentWrapper) {
        var componentWrapper = this.componentWrapper = this.wrapper.append('g');
        if (this.classed){
          componentWrapper.classed(this.classed, true);
        }
      }
    },
    
    onChangeSelected: function (group, groupIndex, model, index) {},
    
    onHover: function (e) {}
  });

  return Component;
});
