define([
  'extensions/views/table/table'
],
  function (Table) {

    var HelpUsageTable = Table.extend({

      capitalizeFirstWord: function(string) {
        return string.replace(/(?:^|\s)\S/, function(letter) { return letter.toUpperCase(); });
      },

      capitalizeSpecialWords: function(string) {
        return string.replace(/(\s|^)lpa(\s|$)/g, " LPA ")
                     .replace(/(\s|^)bacs(\s|$)/g, " BACS ")
                     .replace(/(\s|^)i(\s|$)/g, " I ");
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
