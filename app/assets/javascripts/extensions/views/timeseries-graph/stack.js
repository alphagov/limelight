define([
  'extensions/views/graph/stack'
],
function (Stack) {
  var TimeseriesStack = Stack.extend({
    
    interactive: true
  });
  
  return TimeseriesStack;
});
