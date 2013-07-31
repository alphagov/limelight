define([
  'extensions/views/view',
  'd3loader!'
],
function (View, d3) {
  
  var Graph = View.extend({
    
    d3: d3,
    
    valueAttr: '_count',

    numYTicks: 7,
    
    initialize: function (options) {
      View.prototype.initialize.apply(this, arguments);
      
      var collection = this.collection = options.collection;
      collection.on('reset add remove', this.render, this);
      
      this.prepareGraphArea();
      
      this.scales = {};
      this.margin = {};

      // initialize graph components
      var componentInstances = this.componentInstances = [];
      var defaultComponentOptions = this.getDefaultComponentOptions();
      _.each(this.prop('components'), function (definition) {
        var options = _.extend({}, defaultComponentOptions, definition.options);
        componentInstances.push(new definition.view(options));
      }, this);

      $(window).on('resize', _.bind(this.render, this));
    },
    
    /**
     * Defines default options that get passed to all graph components.
     * This object will be extended with component-specific options.
     * @returns {Object} Default options that get passed to components
     */
    getDefaultComponentOptions: function () {
      return {
        graph: this,
        collection: this.collection,
        el: this.el,
        svg: this.svg,
        wrapper: this.wrapper,
        margin: this.margin,
        scales: this.scales
      }
    },
    
    prepareGraphArea: function () {
      this.innerEl = $('<div class="inner"></div>');
      this.innerEl.appendTo(this.$el);
      
      var svg = this.svg = this.d3.select(this.$el[0]).append('svg');
      
      this.wrapper = svg.append('g')
        .classed('wrapper', true);
    },
    
    /**
     * Calculates current factor between size in displayed pixels and logical
     * size.
     */
    scaleFactor: function () {
      return this.$el.width() / this.width;
    },
    
    // Not implemented; override in configuration or subclass
    calcXScale: function () {
      throw('No x scale defined.');
    },
    
    // Not implemented; override in configuration or subclass
    calcYScale: function () {
      throw('No y scale defined.');
    },

    getConfigNames: function () {
      return ['overlay'];
    },

    pxToValue: function (cssVal) {
      if (!_.isString(cssVal)) {
        return null;
      }
      var matches = cssVal.match(/([0-9\.]+)px/);
      return matches ? parseFloat(matches[1]) : null;
    },

    resize: function () {
      var width = this.width = this.$el.width();

      // when both max-width and max-height are defined, scale graph according
      // to this aspect ratio
      var maxWidth = this.pxToValue(this.$el.css('max-width'));
      var maxHeight = this.pxToValue(this.$el.css('max-height'));
      var minHeight = this.pxToValue(this.$el.css('min-height'));
      if (maxWidth != null && maxHeight != null) {
        var aspectRatio = maxWidth / maxHeight;
        height = width / aspectRatio;
        if (minHeight != null) {
          height = Math.max(height, minHeight);
        }
      } else {
        height = this.$el.height();
      }
      this.height = height;

      // configure SVG for automatic resize
      this.svg.attr({
        width: '100%',
        height: '100%',
        viewBox: '0 0 ' + width + ' ' + height,
        style: 'max-width:' + width + 'px; max-height:' + height + 'px; display:block;'
      });
      $(this.svg.node()).height(height);

      var innerEl = this.innerEl;
      this.margin.top = innerEl.position().top;
      this.margin.left = innerEl.position().left;

      this.innerWidth = innerEl.outerWidth();
      this.innerHeight = innerEl.outerHeight();

      this.margin.bottom = height - this.margin.top - this.innerHeight;
      this.margin.right = width - this.margin.left - this.innerWidth;

      this.wrapper.attr('transform', [
        'translate(',
        this.margin.left,
        ', ',
        this.margin.top,
        ')'
      ].join(''));
    },

    applyConfig: function (name) {
      var config = this.configs[name];
      if (!config) {
        return;
      }

      if (config.initialize) {
        config.initialize.call(this);
      }

      _.each(config, function (value, key) {
        if (key === 'initialize') {
          return;
        }
        this[key] = value;
      }, this);
    },

    /**
     * Hide callout during resize if present. Works around bug in iOS Webkit
     * that incorrectly calculates height of inner element.
     */
    resizeWithCalloutHidden: function () {
      var callout = this.$el.find('.callout');
      var calloutHidden = callout.hasClass('performance-hidden');
      callout.addClass('performance-hidden');

      this.resize();

      if (!calloutHidden) {
        callout.removeClass('performance-hidden');
      }
    },
    
    /**
     * Applies current configuration, then renders components in defined order
     */
    render: function () {
      View.prototype.render.apply(this, arguments);

      this.resizeWithCalloutHidden();

      var configNames = this.getConfigNames();
      if (_.isString(configNames)) {
        configNames = [configNames];
      }

      _.each(configNames, function(configName) {
        this.applyConfig(configName);
      }, this);

      this.scales.x = this.calcXScale();
      this.scales.y = this.calcYScale();
      
      _.each(this.componentInstances, function (component) {
        _.each(configNames, function(configName) {
          component.applyConfig(configName);
        });
        component.render();
      }, this);
    },

    configs: {
      hour: {
        getXPos: function (groupIndex, modelIndex) {
          var group = this.collection.at(groupIndex);
          var model = group.get('values').at(modelIndex);
          return this.moment(model.get('_timestamp'));
        },
        calcXScale: function () {
          var values = this.collection.first().get('values');
          var start = moment(values.first().get('_timestamp'));
          var end = moment(values.last().get('_timestamp'));
          
          var xScale = this.d3.time.scale();
          xScale.domain([start.toDate(), end.toDate()]);
          xScale.range([0, this.innerWidth]);
          return xScale;
        }
      },
      week: {
        getXPos: function(groupIndex, modelIndex) {
          var group = this.collection.at(groupIndex);
          var model = group.get('values').at(modelIndex);
          return this.moment(model.get('_end_at')).subtract(1, 'days');
        },
        calcXScale: function () {
          var start, end, xScale;
          var total = this.collection.first().get('values');
          // scale from first sunday to last sunday
          start = moment(total.first().get('_end_at')).subtract(1, 'days');
          end = moment(total.last().get('_end_at')).subtract(1, 'days');
          xScale = this.d3.time.scale();
          xScale.domain([start.toDate(), end.toDate()]);
          xScale.range([0, this.innerWidth]);
          return xScale;
        }
      },
      month: {
        getXPos: function(groupIndex, modelIndex) {
          return modelIndex;
        },
        calcXScale: function () {
          var start, end, xScale;
          var total = this.collection.first().get('values');
          xScale = this.d3.scale.linear();
          xScale.domain([0, total.length - 1]);
          xScale.range([0, this.innerWidth]);
          return xScale;
        },
      },


      overlay: {
        getYPos: function (groupIndex, modelIndex) {
          var group = this.collection.at(groupIndex);
          var model = group.get('values').at(modelIndex);
          return model.get(this.valueAttr);
        },
        calcYScale: function () {
          var d3 = this.d3;
          var valueAttr = this.valueAttr;
          var max = d3.max(this.collection.models, function (group) {
            return d3.max(group.get('values').models, function (value) {
              return value.get(valueAttr);
            });
          });

          var yScale = this.d3.scale.linear();
          var tickValues = this.calculateLinearTicks([0, Math.max(max, this.minYDomainExtent)], this.numYTicks);
          yScale.domain(tickValues.extent);
          yScale.rangeRound([this.innerHeight, 0]);
          yScale.tickValues = tickValues.values;
          return yScale;
        }
      },

      stack: {
        initialize: function() {
          var valueAttr = this.valueAttr;
          var stack = this.d3.layout.stack()
            .values(function (group) {
              return group.get('values').models;
            })
            .y(function (model, index) {
              return model.get(valueAttr);
            });
          if (this.outStack) {
            stack.out(_.bind(this.outStack, this));
          }
            
          this.layers = stack(this.collection.models.slice().reverse());
        },
        getYPos: function (groupIndex, modelIndex) {
          var model = this.collection.at(groupIndex).get('values').at(modelIndex);
          var y0Property = this.stackY0Property || 'y0';
          var yProperty = this.stackYProperty || 'y';
          return model[y0Property] + model[yProperty];
        },
        getY0Pos: function (groupIndex, modelIndex) {
          var y0Property = this.stackY0Property || 'y0';
          var model = this.collection.at(groupIndex).get('values').at(modelIndex);
          return model[y0Property];
        },
        calcYScale: function () {
          var d3 = this.d3;
          var valueAttr = this.valueAttr;
          var sums = [];
          for (var i = 0; i < this.collection.at(0).get('values').length; i++) {
            sums.push(this.collection.reduce(function (memo, group) {
              return memo + group.get('values').at(i).get(valueAttr);
            }, 0));
          }
          var max = d3.max(sums);
          var yScale = this.d3.scale.linear();
          var tickValues = this.calculateLinearTicks([0, Math.max(max, this.minYDomainExtent)], this.numYTicks);
          yScale.domain(tickValues.extent);
          yScale.rangeRound([this.innerHeight, 0]);
          yScale.tickValues = tickValues.values;
          return yScale;
        }
      }
    }
  });

  return Graph;
});
