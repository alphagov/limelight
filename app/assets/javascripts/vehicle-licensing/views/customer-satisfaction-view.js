define([
  'extensions/views/view'
],
  function (View) {

    var toAttributeName = function(service) {
      return 'satisfaction_' + service.replace('-', '_');
    };

    var CustomerSatisfactionView = View.extend({

      initialize: function () {
        View.prototype.initialize.apply(this, arguments);
        this.satisfactionAttribute = toAttributeName(this.service);
        this.collection.on('reset', this.render, this);
      },

      getSatisfaction: function (model) {
        return model.get(this.satisfactionAttribute);
      },

      getCurrentValue: function() {
        var value = this.getSatisfaction(this.collection.last());
        return this.formatNumericLabel(value * 100) + '%';
      },

      getCurrentDate: function() {
        var value = this.collection.last().get('_timestamp');
        return value.format('MMMM YYYY');
      },

      render: function () {
        this.$el.find('.current-value').html("<strong>" + this.getCurrentValue() + "</strong>");
        this.$el.find('.current-date').html(this.getCurrentDate());
      }
    });
    return CustomerSatisfactionView;
  });
