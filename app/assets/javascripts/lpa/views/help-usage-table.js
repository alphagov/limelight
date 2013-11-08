define([
  'extensions/views/table/table'
],
  function (Table) {

    var HelpUsageTable = Table.extend({

      capitalizeFirstWord: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },

      capitalizeSpecialWords: function(string) {
        return string.replace(/\b(lpa|bacs|i)\b/g, function (s) {
          return s.toUpperCase();
        });
      },

      sanitizeDescription: function (rawDescription) {
        var spaceSeparatedDescription = rawDescription.replace(/-/g, " "),
            lowercaseDescription = this.capitalizeSpecialWords(spaceSeparatedDescription);
        return this.capitalizeFirstWord(lowercaseDescription);
      },

      columns: [
        {
          id: 'description',
          title: 'Description',
          sortable: true,
          getValue: function (model) {
            return this.sanitizeDescription(model.get('description'));
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
