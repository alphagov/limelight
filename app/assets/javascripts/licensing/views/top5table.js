define([
  'require',
  './applicationstable'
],
function (require, ApplicationsTable) {
  var Top5Table = ApplicationsTable.extend({
    
    lazyRender: false,
    
    initialize: function (options) {
      options = options || {};
      
      this.title = options.title || 'Licence';
      
      this.columns[0].title = function () {
        return this.title;
      };
      
      _.each(this.columns, function (column) {
        column.sortable = false;
      });
      ApplicationsTable.prototype.initialize.apply(this, arguments);
    }
  });
  
  return Top5Table;
});
