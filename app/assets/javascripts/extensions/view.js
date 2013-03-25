define([
    'backbone',
    'moment'
],
function (Backbone, moment) {
    var View = Backbone.View.extend({
      
      moment: moment,
      
      initialize: function (options) {
        options = _.extend({}, options);
        this.el = options.el;
        Backbone.View.prototype.initialize.apply(this, arguments);
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
        function isAnExactMultipleOf(value) {
          return function(n) { return n % value === 0; };
        }

        var max = values.reduce(function(a,b) {return a > b ? a : b});
        var magnitude = this.magnitudeFor(max);
        var decimalPlaces = values.every(isAnExactMultipleOf(magnitude.value))? 0 : 1;
        
        var format = this.format;
        return function(value) {
          if (value === 0) return "0";
          return format(value, magnitude, decimalPlaces);
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
