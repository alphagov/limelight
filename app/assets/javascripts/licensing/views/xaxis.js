define([
  'extensions/views/graph/axis'
],
function (Axis) {
  
  var ApplicationsXAxis = Axis.extend({
    
    classed: 'x-axis',
    position: 'bottom',
    orient: 'bottom',
    
    configs: {
      week: {
        getTick: function (model) {
          return moment(model.get('_end_at')).subtract(1, 'days').toDate();
        },
        tickFormat: function () {
          var moment = this.moment;
          return function (d, index) {
            return moment(d).format('D MMM');
          }
        }
      },
      month: {
        getTick: function (model, index) {
          return index;
        },
        tickFormat: function () {
          var period = this.collection.query.get('period');
          var values = this.collection.first().get('values');
          return function (d, index) {
            return values.at(index).get('_start_at').format('MMM');
          }
        }
      }
    },
    
    tickValues: function () {
      return this.collection.first().get('values').map(this.getTick);
    },
    tickPadding: 6,
    tickFormat: function () {
      var period = this.collection.query.get('period');
      var values = this.collection.first().get('values');
      var moment = this.moment;
      return function (d, index) {
        if (period === 'month') {
          return values.at(index).get('_start_at').format('MMMM');
        } else {
          return moment(d).format('D MMM');
        }
      }
    },
    offsetY: 8,
    getScale: function () {
      return this.scales.x;
    },
    onChangeSelected: function (groupSelected, groupIndexSelected, modelSelected, indexSelected) {
      var ticks = this.componentWrapper.selectAll('.tick');
      ticks.classed('selected', false);

      if (indexSelected != null) {
        d3.select(ticks[0][indexSelected]).classed('selected', true);
      }
    }
  });
  
  return ApplicationsXAxis;
});
