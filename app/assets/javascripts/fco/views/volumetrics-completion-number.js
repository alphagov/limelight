define([
  'extensions/views/view'
],
function (View) {
  var CompletionSelectedView = View.extend({
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
        var end = moment(model.get('_end_at')).subtract(1, 'days');

        var percentage = Math.round(selection.selectedModel.get('completion') * 100); 

        content = [
          '<strong>',
          percentage,
          '%</strong>',
          start.format(start.month() === end.month() ? 'D' : 'D MMM'),
          ' – ',
          end.format('D MMM YYYY')
        ].join('');
      } else {
        var values = this.collection.at(0).get('values');
        var sum = values.reduce(function (memo, model) {
          return memo + model.get('completion');
        }, 0);
        var percentage = Math.round(100 * sum / values.length);
        content = [
          '<strong>',
          percentage,
          '%</strong>',
          ' mean over the last 9 weeks'
        ].join('');
      }
      this.$el.html(content);
    }
  });


  return CompletionSelectedView;
});
