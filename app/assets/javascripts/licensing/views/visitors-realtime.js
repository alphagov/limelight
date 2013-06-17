define([
  'extensions/views/view'
],
function (View) {
  var VisitorsRealtimeView = View.extend({
    initialize: function () {
      this.collection.on('reset', this.render, this);
    },
    render: function () {
      if (this.collection.length == 0) {
        return;
      }

      var numberOfVisitorsRealtime = this.collection.at(0).get("unique_visitors");

      this.$el.html("<strong>" + numberOfVisitorsRealtime + "</strong> Users online now");
    }
  });
  return VisitorsRealtimeView;
})