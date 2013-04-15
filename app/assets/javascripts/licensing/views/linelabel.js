define([
  'extensions/graph/linelabel'
],
function (LineLabel) {
  var ApplicationsLineLabel = LineLabel.extend({
    
    maxTextWidth: 160
  });
  
  return ApplicationsLineLabel;
});
