define([
  'extensions/views/graph/line'
],
function (Line) {
  
  var TimeseriesLine = Line.extend({
    
    interactive: function (e) {
      return e.slice % 3 !== 2;
    }
    
  });
  
  return TimeseriesLine;
});
