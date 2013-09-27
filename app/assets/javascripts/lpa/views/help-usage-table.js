define([
  'extensions/views/table/table'
],
  function (Table) {
    var sanitizeDescription = function (rawDescription) {
      return rawDescription;
    };

    var HelpUsageTable = Table.extend({

      columns: [
        {
          id: 'description',
          title: 'Description',
          sortable: true,
          getValue: function (model) {
            return sanitizeDescription(model.get('description'));
          }
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
