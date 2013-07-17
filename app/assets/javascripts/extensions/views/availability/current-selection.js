define([
  'extensions/views/view'
],
function (View) {
  var CurrentSelectionView = View.extend({
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
          start.format('D MMM YYYY HH:mm'),
          ' – ',
          end.format('HH:mm')
        ].join('');
      } else {
        content = [
          'Last 24 hours'
        ].join('');
      }
      this.$el.html(content);
    }
  });

  return CurrentSelectionView;
});
