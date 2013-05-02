define([
  'extensions/views/graph/component'
],
function(Component) {
  var BarComponent = Component.extend({
    render: function() {
      Component.prototype.render.apply(this, arguments);

      var selection = this.componentWrapper.selectAll('g.bar')
          .data(this.collection.at(0).get('values').models);

      var enterSelection = selection.enter().append('g').attr('class', 'bar');
      enterSelection.append('rect');
      enterSelection.append('line');
      enterSelection.append('text');

      var that = this;
      selection.each(function (model, i) {
        model.set('x', that.x.call(that, model, i));
        model.set('y', that.y.call(that, model, i));
        model.set('width', that.width.call(that, model, i));
      }, this);

      selection.each(function(model, i) {
        d3.select(this)
          .select('rect')
          .attr('x', model.get('x'))
          .attr('y', model.get('y'))
          .attr('width', model.get('width'))
          .attr('height', that.scales.y(0) - model.get('y'));

        d3.select(this)
          .select('line')
          .attr('x1', model.get('x'))
          .attr('y1', model.get('y'))
          .attr('x2', model.get('x') + model.get('width'))
          .attr('y2', model.get('y'));

        d3.select(this)
          .select('text')
          .attr('x', model.get('x'))
          .attr('y', model.get('y'));

      }, this);
    }
  });

  return BarComponent;
});