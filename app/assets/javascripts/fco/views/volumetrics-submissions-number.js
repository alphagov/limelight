define([
  'require',
  './volumetrics-completion-number'
],
function (require, CompletionNumberView) {
  var SubmissionsNumberView = CompletionNumberView.extend({

    getValue: function () {
      return this.formatNumericLabel(this.collection.at(0).get('mean'));
    },

    getLabel: function () {
      var weeks = this.collection.at(0).get('weeks'),
          unavailableWeeks = weeks.total - weeks.available,
          label = ['mean per week over the last', weeks.total, 'weeks'];

      if (unavailableWeeks > 0) {
        label = label.concat([
          "<span class='unavailable'>(" + unavailableWeeks,
          this.pluralise('week', unavailableWeeks),
          "unavailable)</span>"
        ]);
      }

      return label.join(' ');
    },

    getValueSelected: function (selection) {
      return this.formatNumericLabel(
        selection.selectedModel.get('uniqueEvents')
      );
    }
  });

  return SubmissionsNumberView;
});
