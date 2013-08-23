define([
    'backbone',
    'moment'
],
function (Backbone, moment) {
    var View = Backbone.View.extend({
      
      moment: moment,
      
      initialize: function (options) {
        _.extend(this, options);
        Backbone.View.prototype.initialize.apply(this, arguments);
      },
      
      keys: {
        escape: 27
      },
      
      magnitudes: {
          million:  {value: 1e6, threshold: 1e6 / 2, suffix:"m"},
          thousand: {value: 1e3, threshold: 1e3 / 2, suffix:"k"},
          unit:     {value: 1,   threshold: 0,       suffix:"", trimDecimals: true}
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

        var max = values.reduce(function(a,b) {return a > b ? a : b});
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
        if (err <= .15) step *= 10;
        else if (err <= .35) step *= 5;
        else if (err <= .75) step *= 2;

        // Round start and stop values to step interval.
        var first = Math.floor(extent[0] / step) * step,
            last = Math.ceil(extent[1] / step) * step,
            lastInclusive = last + step / 2;

        return {
          values:d3.range.apply(d3, [first, lastInclusive, step]),
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
        if (value == 0) return "0";
        
        var magnitudes = View.prototype.magnitudes;

        var magnitude = function(num) {
              return Math.ceil(Math.log(Math.abs(num)) / Math.LN10);
            },
            roundToSignificantFigures = function(num, n) {
              var mag = Math.max(magnitude(num), 0); // ignore negative magnitude
              var factor = Math.pow(10, n - mag);
              return Math.round(num * factor) / factor;
            },
            thresholds = [ magnitudes.million, magnitudes.thousand, magnitudes.unit ],
            roundedValue = roundToSignificantFigures(value, 3),
            significantFigures = null;

        var trimDecimals = function(string) {
            if (string.indexOf('.') === -1) return string;
            return string.replace(/0+$/, '').replace(/\.$/, '');
        };

        for (var i = 0; i < thresholds.length; i++) {
          if (Math.abs(roundedValue) >= (thresholds[i].threshold)) {
            if (Math.abs(roundedValue) < thresholds[i].value) {
              significantFigures = 2;
            } else {
              significantFigures = 3;
              value = roundedValue;
            }
            value = roundToSignificantFigures(value, significantFigures) / thresholds[i].value;
            var valueString = value.toPrecision(Math.abs(value) < 1 ? 2 : 3);
            if (thresholds[i].trimDecimals) valueString = trimDecimals(valueString);
            return valueString + thresholds[i].suffix;
          }
        }
        return roundedValue.toString();
      },

      formatPercentage: function (fraction, numDecimals) {
        if (isNaN(fraction) || !_.isNumber(fraction)) {
          return fraction;
        }
        numDecimals = numDecimals || 0;
        return (100 * fraction).toFixed(numDecimals) + '%';
      },
      
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
