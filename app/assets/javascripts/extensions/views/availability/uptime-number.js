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

        content = [
          '<strong>',
          Math.round(model.get('uptimeFraction') * 100) + '%',
          '</strong> ',
          'uptime in the period ',
          start.format('HH:mm'),
          ' – ',
          end.format('HH:mm')
        ].join('');
      } else {
        content = [
          '<strong>',
          Math.round(this.collection.getPercentageOfUptime()) + '%',
          '</strong>',
          'Mean uptime for the last 24 hours'
        ].join('');
      }
      this.$el.html(content);
    }
  });

  return UptimeNumberView;
});
