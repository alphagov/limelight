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
      return 'last ' + this.collection.at(0).get('weeksWithData') + ' weeks';
    },

    getValueSelected: function (selection) {
      return this.formatPercentage(selection.selectedModel.get('completion'));
    },

    getLabelSelected: function (selection) {
      var model = selection.selectedModel;
      var start = model.get('_start_at');
      var end = moment(model.get('_end_at')).subtract(1, 'days');

      var startLabel = start.format(start.month() === end.month() ? 'D' : 'D MMM');
      var endLabel = end.format('D MMM YYYY');
      return startLabel + ' to ' + endLabel;
    }
  });

  return CompletionNumberView;
});
