define([
  'extensions/views/view'
],
function (View) {
  var UptimeNumberView = View.extend({
    initialize: function (attrs, options) {
      View.prototype.initialize.apply(this, arguments);
      this.collection.on('change:selected reset', this.render, this);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      var selection = this.collection.getCurrentSelection();
      var content;
      if (selection.selectedModel) {
        var model = selection.selectedModel;
        var start = model.get('_start_at');
        var end = moment(model.get('_start_at')).add(1, 'hours');

        var percentage = model.get('uptimeFraction') * 100;
        if (percentage !== 100) {
          percentage = percentage.toFixed(3);
        }
        content = [
          '<strong>',
          percentage + '%',
          '</strong> ',
          'Uptime for the period<br>',
          start.format('D MMM YYYY ha'),
          ' to ',
          end.format('ha')
        ].join('');
      } else {
        var percentage = this.collection.getPercentageOfUptime();
        if (percentage !== 100) {
          percentage = percentage.toFixed(3);
        }
        content = [
          '<strong>',
          percentage + '%',
          '</strong>',
          'Uptime for the last 24 hours'
        ].join('');
      }
      this.$el.html(content);
    }
  });

  return UptimeNumberView;
});
