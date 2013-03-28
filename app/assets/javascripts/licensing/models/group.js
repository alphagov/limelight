define([
  'extensions/model',
  'extensions/collection'
],
function (Model, Collection) {
  
  var Group = Model.extend({
    
    parse: function (data) {
      data.values = new Collection(data.values);
      return data;
    }  
  });
  
  return Group;
});
