define([
  'extensions/views/table/table'
],
  function (Table) {
    var capitalize = function(string) {
      return string.replace(/(?:^|\s)\S/, function(letter) { return letter.toUpperCase(); });
    };

    var sanitizeDescription = function (rawDescription) {
      var spaceSeparatedDescription = rawDescription.replace(/-/g, " "),
          lowercaseDescription = spaceSeparatedDescription.replace(/lpa/g, "LPA");
      return capitalize(lowercaseDescription);
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
