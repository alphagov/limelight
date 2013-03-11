define([
  'extensions/d3view'
],
function (D3View) {
  var TotalApplications = D3View.extend({
    
    width: 954,
    height: 400,
    
    margin: {
      top: 20,
      bottom: 50,
      left: 60,
      right: 40
    },
    
    xAxis: {
      visible: true
    },
    
    yAxis: {
      distance: 10
    },
    
    render: function () {
      var xScale = this.xScale = this.calcXScale();
      var yScale = this.yScale = this.calcYScale();
      
      
      var line = d3.svg.line()
        .x(function (model) {
          return xScale(model.get('_start_at').toDate());
        })
        .y(function (model) {
          return yScale(model.get('count'));
        });

      this.innerWrapper.append("svg:path")
        .classed("line", true)
        .attr("d", line(this.collection.models));
      
      D3View.prototype.render.apply(this, arguments);
    },
    
    calcXScale: function () {
      var collection = this.collection;
      var xScale = d3.time.scale();
      xScale.domain([
        collection.first().get('_start_at').toDate(),
        collection.last().get('_start_at').toDate()
      ]);
      xScale.range([0, this.innerWidth]);
      return xScale;
    },
    
    calcYScale: function () {
      var collection = this.collection;
      var yScale = d3.scale.linear();
      var max = d3.max(collection.models, function (model) {
        return model.get('count');
      })
      yScale.domain([0, max]);
      yScale.range([this.innerHeight, 0]);
      return yScale;
    },
    
    
  });
  
  return TotalApplications;
});
