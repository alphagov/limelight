define([
  'extensions/view',
  'd3'
],
function (View, d3) {
  var D3View = View.extend({

    d3: d3,
    
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    
    defaultXAxis: {
      visible: true,
      distance: 10,
      tickPadding: 4
    },
    
    defaultYAxis: {
      visible: true,
      distance: 0,
      ticks: 10,
      tickPadding: 0
    },
    

    initialize: function (options) {
      View.prototype.initialize.apply(this, arguments);

      var collection = this.collection = options.collection;
      collection.on('reset add remove', this.render, this);

      var el = this.el = options.el;

      this.innerWidth = this.width - this.margin.left - this.margin.right;
      this.innerHeight = this.height - this.margin.top - this.margin.bottom;

      var svg = this.svg = this.d3.select(this.el[0]).append('svg');
      svg.attr({
        width: '100%',
        height: '100%',
        viewBox: '0 0 ' + this.width + ' ' + this.height,
        style: 'max-width:' + this.width + 'px; max-height:' + this.height + 'px'
      });

      this.outerWrapper = svg.append('g');
      this.innerWrapper = this.outerWrapper.append('g')
        .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top +')');
    },
    
    render: function () {
      View.prototype.render.apply(this, arguments);
      
      if (this.xAxis) {
        this.renderXAxis();
      }

      if (this.yAxis) {
        this.renderYAxis();
      }
    },

    renderXAxis: function () {
      
      var config = _.extend({}, this.defaultXAxis, this.xAxis);
      if (!config.visible) {
        return;
      }
      
      var xAxis = d3.svg.axis()
      .scale(this.xScale)
      .tickPadding(config.tickPadding);

      this.outerWrapper.append("g")
      .classed("x-axis", true)
      .attr("transform", "translate(" + this.margin.left + "," + (this.innerHeight + this.margin.top + config.distance) + ")")
      .call(xAxis);
    },

    renderYAxis: function () {
      
      var config = _.extend({}, this.defaultYAxis, this.yAxis);
      if (!config.visible) {
        return;
      }
      
      var yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient("left");

      yAxis
        .ticks(config.ticks)
        .tickPadding(config.tickPadding)
        .tickFormat(this.numberListFormatter([0, 100000]));

      this.outerWrapper.append("g")
        .classed("y-axis", true)
        .attr("transform", "translate(" + (this.margin.left - config.distance) + "," + this.margin.top + ")")
        .call(yAxis);
    }

  });

  return D3View;
});
