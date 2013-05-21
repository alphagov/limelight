define([
    'backbone',
    'moment',
    'd3loader!'
],
function (Backbone, moment, d3) {
    
    var View = Backbone.View.extend({
      
      isServer: typeof window !== 'object',
      
      moment: moment,
      
      d3: d3,
      
      make: function(tagName, attributes, content) {
        if (this.isServer) {
          var el = $('<' + tagName + '>')[0];
          if (attributes) Backbone.$(el).attr(attributes);
          if (content != null) Backbone.$(el).html(content);
          return el;
        } else {
          return Backbone.View.prototype.make.apply(this, arguments);
        }
      },

      initialize: function (options) {
        _.extend(this, options);
        Backbone.View.prototype.initialize.apply(this, arguments);
        this.viewInstances = {};
      },
      
      keys: {
        escape: 27
      },
      
      magnitudes: {
          million:  {value: 1e6, suffix:"m"},
          thousand: {value: 1e3, suffix:"k"},
          unit:     {value: 1, suffix:""}
      },
      
      magnitudeFor: function (value) {
          if (value >= 1e6) return this.magnitudes.million;
          if (value >= 1e3) return this.magnitudes.thousand;
          return this.magnitudes.unit;
      },

      format: function (value, magnitude, decimalPlaces) {
          return (value / magnitude.value).toFixed(decimalPlaces || 0).toString() + magnitude.suffix;
      },

      /**
       * Returns a number formatting function whose actual format depends on the values passed as argument.
       * The formatter can then be used to format all the number in the series applying the same format, regardless of the
       * individual values. This is especially useful for graph axes, where a homogeneous formatting of the labels is
       * required.
       *
       * @param values
       * @return {Function}
       */
      numberListFormatter: function (values) {
        function isAnExactMultipleOf(magnitude) {
          return function(n) { return n % magnitude === 0; };
        }

        var max = values.reduce(function(a,b) {return a > b ? a : b;});
        var magnitude = this.magnitudeFor(max);
        var decimalPlaces;
        if (max === magnitude.value) {
          decimalPlaces = 1;
        } else {
          decimalPlaces = values.every(isAnExactMultipleOf(magnitude.value))? 0 : 1;
        }
        
        var format = this.format;
        return function(value) {
          if (value === 0) return "0";
          return format(value, magnitude, decimalPlaces);
        };
      },

      /**
       * Returns an object describing evenly spaced, nice tick values given an extent and a minimum tick count.
       * The returned object will include the values, extent and step of the ticks.
       * The extent may be extended to include the next nice tick value.
       *
       * @param extent
       * @param minimumTickCount
       * @return {Object}
       */
      calculateLinearTicks: function(extent, minimumTickCount) {
        if (extent[0] >= extent[1]) {
          throw new Error("Upper bound must be larger than lower.");
        }
        var targetTickCount = minimumTickCount - 1,
            span = extent[1] - extent[0],
            step = Math.pow(10, Math.floor(Math.log(span / targetTickCount) / Math.LN10)),
            err = targetTickCount / span * step;

        // Filter ticks to get closer to the desired count.
        if (err <= 0.15) step *= 10;
        else if (err <= 0.35) step *= 5;
        else if (err <= 0.75) step *= 2;

        // Round start and stop values to step interval.
        var first = Math.floor(extent[0] / step) * step,
            last = Math.ceil(extent[1] / step) * step,
            lastInclusive = last + step / 2;

        return {
          values:this.d3.range.apply(this.d3, [first, lastInclusive, step]),
          extent:[first, last],
          step:step
        };
      },

      /**
       * Format a number to be displayed with abbreviated suffixes.
       * This function is more complicated than one would think it need be,
       * this is due to lack of predictability in Number.toPrecision, Number.toFixed
       * and some rounding issues.
       */
      formatNumericLabel: function(value) {
        if (value === 0) return "0";
        
        var magnitudes = View.prototype.magnitudes;
        var magnitude = function(num, n) {
              return Math.pow(10, n - Math.ceil(Math.log(Math.abs(num)) / Math.LN10));
            },
            roundToSignificantFigures = function(num, n) {
              return Math.round(num * magnitude(num, n)) / magnitude(num, n);
            },
            thresholds = [ magnitudes.million, magnitudes.thousand ],
            roundedValue = roundToSignificantFigures(value, 3),
            significantFigures = null;

        for (var i = 0; i < thresholds.length; i++) {
          if (roundedValue >= (thresholds[i].value / 2)) {
            if (roundedValue < thresholds[i].value) {
              significantFigures = 2;
            } else {
              significantFigures = 3;
              value = roundedValue;
            }
            value = roundToSignificantFigures(value, significantFigures) / thresholds[i].value;
            return value.toPrecision(value < 1 ? 2 : 3) + thresholds[i].suffix;
          }
        }
        return roundedValue.toString();
      },
      
      render: function (options) {
        this.trigger('prerender');
        
        Backbone.View.prototype.render.apply(this, arguments);
        this.renderContent(options);
        if (!this.isServer) {
          window.el = this.el;
        }
        this.renderSubviews(options, _.bind(function () {
          this.trigger('postrender');
        }, this));
      },
      
      renderContent: function (options) {
        if (this.isServer && this.template) {
          this.$el.html(this.template(this.templateContext(options)));
        }
      },

      templateContext: function () {
        return {};
      },

      renderSubviews: function (options, callback) {
        
        var remaining = 0;
        var subviewReady = function () {
          if (--remaining <= 0) {
            callback();
          }
        };
        
        var instances = this.viewInstances;
        _.each(this.views, function (definition, selector) {
          var el = this.$el.find(selector);
          if (!el.length) {
            console.warn('No element found for ' + selector);
            return;
          }
          
          el.empty();
          
          var view, options;
          if (definition instanceof View) {
            view = definition;
            options = {};
          } else if (_.isObject(definition)) {
            view = definition.view;
            if (_.isFunction(definition.options)) {
              options = definition.options.call(this);
            } else {
              options = _.extend({}, definition.options);
            }
          } else {
            console.warn('Invalid view definition for ' + selector);
            return;
          }
          options.el = el;

          var instance = instances[selector] = new view(options);

          if (options.renderOnInit) {
            instance.render();
          } else {
            instance.on('postrender', function() {
              subviewReady(instance);
            }, this);
            remaining++;
          }
        }, this);
        
        if (!remaining) {
          callback();
        }
      },
      
      views: {},
      
      /**
       * Convenience method, gets object property or method result. The method
       * is passed no arguments and is executed in the object context.
       * @param {String} prop Name of object property or method.
       * @param {Object} [obj=this] Object to inspect.
       */
      prop: function(prop, obj) {
        obj = obj || this;
        return _.isFunction(obj[prop]) ? obj[prop].call(obj) : obj[prop];
      }
    });
    
    return View;
});
