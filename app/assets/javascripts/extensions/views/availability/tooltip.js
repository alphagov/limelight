define([
  'extensions/views/timeseries-graph/callout'
],
function (Callout) {
  var Tooltip = Callout.extend({

    classed: 'tooltip',

    getValue: function (group, groupIndex, model, index) {
      return model.get(this.graph.valueAttr);
    },

    renderContent: function (el, group, groupIndex, model, index) {
      var value = this.getValue(group, groupIndex, model, index);
      var content = $('<p>').html(value);
      el.empty().append(content);
    }
  });

  return Tooltip;
});
