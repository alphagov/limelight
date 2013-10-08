define([
  'extensions/views/single-stat'
],
function (SingleStatView) {
  var ResponeTimeNumberView = SingleStatView.extend({

    changeOnSelected: true,

    getValue: function () {
      var responseTime = Math.round(this.collection.getAverageResponseTime());
      return this.formatDuration(responseTime, 4);
    },

    labelPrefix: 'mean ',

    config: {
      hour: {
        label: '24 hours',
        selectionFormat: function (start, end) {
          return [
            start.format('ha'),
            ' to ',
            end.format('ha'),
            ',<br>',
            start.format('D MMMM YYYY')
          ].join('')
        }
      },

      day: {
        label: '30 days',
        selectionFormat: function (start, end) {
          return start.format('D MMMM YYYY');
        }
      }
    },


    getLabel: function () {
      var period = this.collection.query.get('period');

      return this.labelPrefix + 'for the last ' + this.config[period].label;
    },

    getValueSelected: function (selection) {
      return this.formatDuration(selection.selectedModel.get('avgresponse'), 4);
    },

    getLabelSelected: function (selection) {
      var model = selection.selectedModel;
      var start = model.get('_start_at');
      var end = model.get('_end_at');
      var period = this.collection.query.get('period');

      return this.config[period].selectionFormat(start, end);
    }
  });

  return ResponeTimeNumberView;
});
