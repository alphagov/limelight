define([
  'require',
  './response-time-number'
],
function (require, ResponseTimeNumberView) {
  var UptimeNumberView = ResponseTimeNumberView.extend({

    labelPrefix: '',

    getValue: function () {
      return this.formatPercentage(this.collection.getFractionOfUptime());
    },

    getValueSelected: function (selection) {
      var model = selection.selectedModel;
      return this.formatPercentage(model.get('uptimeFraction'));
    }
  });

  return UptimeNumberView;
});
