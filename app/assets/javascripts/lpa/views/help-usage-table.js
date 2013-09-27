define([
  'extensions/views/table/table'
],
  function (Table) {
    var HelpUsageTable = Table.extend({

      columns: [
        {
          id: 'description',
          title: 'Description',
          sortable: true
        },
        {
          id: 'count',
          className: 'count numeric',
          title: 'Usage last week',
          sortable: true,
          defaultDescending: true,
          getValue: function (model) {
            return this.formatNumericLabel(model.get('count'));
          }
        }
      ],

      defaultSortColumn: 1
    });

    return HelpUsageTable;
  });
