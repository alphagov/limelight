define([
  'extensions/table/table'
],
function (Table) {
  var ApplicationsTable = Table.extend({
    columns: [
      {
        id: 'title',
        title: 'Licence',
        getValue: function (model) {
          var licence = model.get('licenceName')[0]
          var authority = model.get('authorityName')[0]
          return licence + ' &ndash; ' + authority;
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
