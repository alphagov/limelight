define([
  'extensions/views/timeseries-graph/callout'
],
function (TimeseriesCallout) {
  
  var LPATimeseriesCallout = TimeseriesCallout.extend({

    renderContent: function (el, group, groupIndex, model, index) {
      
      var header = $('<h3>').html(this.getHeader.apply(this, arguments));

      var line1 = $('<p>').html(group.get('title'));

      var line2 = $('<p>').html([
        this.formatNumericLabel(Math.floor(model.get(this.graph.valueAttr))),
        ' (',
        Math.round(model.get('fraction') * 100),
        '%)'
      ].join(''));
      
      el.empty().append(header, line1, line2);
    }
    
  });
  
  return LPATimeseriesCallout;
});
