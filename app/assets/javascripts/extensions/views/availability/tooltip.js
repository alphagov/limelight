define([
  'extensions/views/timeseries-graph/callout'
],
function (Callout) {
  var Tooltip = Callout.extend({

    classed: 'tooltip',

    getValue: function (group, groupIndex, model, index) {
      return model.get(this.graph.valueAttr);
    },

    svgText: function (value) {
      return '<svg width="80" height="15"><g transform="translate(0,0)"><text class="tooltip-text" x="10" y="15">'
      + value + '</text></g></svg>';
    },

    renderContent: function (el, group, groupIndex, model, index) {
      var value = this.getValue(group, groupIndex, model, index);
      el.empty().append($('<p>').html(this.svgText(value)));
    }
  });

  return Tooltip;
});
