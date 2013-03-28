define([
  'extensions/table/table'
],
function (Table) {
  var ApplicationsTable = Table.extend({
    
    lazyRender: true,
    
    columns: [
      {
        id: 'title',
        title: 'Licence',
        getValue: function (model) {
          var res = model.get('authorityName');
          var licence = model.get('licenceName');
          if (licence) {
            res = licence + ' &ndash; ' + res;
          }
          return res;
        }
      },
      {
        id: 'count',
        title: 'Licence&nbsp;applications',
        getValue: function (model) {
          return this.formatNumericLabel(model.get('_count'));
        }
      }
    ]
  });
  
  return ApplicationsTable;
});
