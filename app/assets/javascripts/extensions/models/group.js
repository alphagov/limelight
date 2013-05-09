define([
  'extensions/models/model',
  'extensions/collections/timeseries'
],
function (Model, Timeseries) {
  
  var Group = Model.extend({
    
    initialize: function () {
      Model.prototype.initialize.apply(this, arguments);
      
      // this.get('values').on('change:selected', this.onValuesChangeSelected, this);
    },
    
    parse: function (data) {
      data.values = new Timeseries(data.values, { parse: true });
      return data;
    },
    
    onValuesChangeSelected: function (model, index) {
      
    }
  });
  
  return Group;
});
