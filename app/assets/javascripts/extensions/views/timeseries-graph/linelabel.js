define([
  'extensions/views/graph/linelabel'
],
function (LineLabel) {
  var TimeseriesLineLabel = LineLabel.extend({
    
    showSquare: true,
    interactive: function (e) {
      return e.slice % 3 === 2;
    }
  });
  
  return TimeseriesLineLabel;
});
