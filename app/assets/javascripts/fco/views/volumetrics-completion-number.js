define([
  'extensions/views/single-stat'
],
function (SingleStatView) {
  var CompletionNumberView = SingleStatView.extend({

    changeOnSelected: true,

    getValue: function () {
      return this.formatPercentage(this.collection.at(0).get('totalCompletion'));
    },

    getLabel: function () {
      var weeks = this.collection.at(0).get('weeks'),
          unavailableWeeks = weeks.total - weeks.available,
          label = ['last', weeks.total, 'weeks'];

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
      return this.formatPercentage(selection.selectedModel.get('completion'));
    },

    getLabelSelected: function (selection) {
      return this.formatPeriod(selection.selectedModel, 'week');
    }
  });

  return CompletionNumberView;
});
