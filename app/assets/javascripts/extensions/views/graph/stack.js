define([
  'require',
  './line',
  'extensions/views/graph/component'
],
function (require, Line, Component) {
  var Stack = Line.extend({
    
    render: function () {
      Component.prototype.render.apply(this, arguments);

      var layers = this.graph.layers;
      
      var groupStacks = this.componentWrapper.selectAll('g.stacks').data([0]);
      groupStacks.enter().append('g').attr('class', 'stacks');

      var groupLines = this.componentWrapper.selectAll('g.lines').data([0]);
      groupLines.enter().append('g').attr('class', 'lines');

      var selectionStacks = groupStacks.selectAll('g.group')
          .data(layers);
      selectionStacks.exit().remove();

      var selectionLines = groupLines.selectAll('g.group')
          .data(layers);
      selectionLines.exit().remove();

      this.renderContent(selectionStacks, selectionLines);
    },
    
    renderContent: function (selectionStacks, selectionLines) {
      var that = this;
      var getX = function (model, index) {
        return that.x.call(that, null, 0, model, index)
      };

      var yScale = this.scales.y;
      var getY = function (model, index) {
        return yScale(model.y + model.y0);
      };

      var getY0 = function (model, index) {
        return yScale(model.y0);
      };

      var area = d3.svg.area()
        .x(getX)
        .y0(getY0)
        .y1(getY);
        
      var line = d3.svg.line()
        .x(getX)
        .y(getY);

      var graph = this.graph;
      var maxGroupIndex = this.collection.length - 1;

      selectionStacks.enter().append("g").attr('class', 'group').append('path')
          .attr("class", function (group, index) {
            return 'stack stack' + (maxGroupIndex-index) + ' ' + group.get('id');
          });
      selectionStacks.select('path').attr("d", function(group, groupIndex) {
        return area(group.get('values').models);
      });

      selectionLines.enter().append("g").attr('class', 'group').append('path')
          .attr("class", function (group, index) {
            return 'line line' + (maxGroupIndex-index) + ' ' + group.get('id');
          });
      selectionLines.select('path').attr("d", function(group, groupIndex) {
        return line(group.get('values').models);
      });
    },

    onChangeSelected: function (groupSelected, groupIndexSelected, modelSelected, indexSelected) {
      Line.prototype.onChangeSelected.apply(this, arguments);
      this.collection.each(function (group, groupIndex) {
        var selected = (groupIndexSelected === groupIndex);
        var stack = this.componentWrapper.select('path.stack' + groupIndex);
        stack.classed('selected', selected);
      }, this);
    }
  });

  return Stack;
});
