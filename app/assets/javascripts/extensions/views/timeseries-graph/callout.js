define([
  'extensions/views/graph/callout'
],
function (Callout) {
  
  var TimeseriesCallout = Callout.extend({
  
    horizontal: 'right',
    vertical: 'bottom',
    xOffset: -7,
    yOffset: -7,
    
    renderContent: function (el, group, groupIndex, model, index) {
      
      var header = $('<h3>').html(this.getHeader.apply(this, arguments));
      
      var body = $('<dl>').html([
        '<dt>',
        group.get('title'),
        '</dt>',
        '<dd>',
        this.formatNumericLabel(Math.floor(model.get(this.graph.valueAttr))),
        '</dd>'
      ].join(''));
      
      el.empty().append(header, body);
    }
    
  });
  
  return TimeseriesCallout;
});
