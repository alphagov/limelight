define([
  'jquery',
  'backbone',
  'extensions/model',
  'moment'
],
function ($, Backbone, Model, moment) {
  var Collection = Backbone.Collection.extend({
    
    moment: moment,
    
    model: Model,
    
    defaultDateFormat: Model.prototype.defaultDateFormat,
    
    /**
     * Convenience method, gets object property or method result. The method
     * is passed no arguments and is executed in the object context.
     * @param {String} prop Name of object property or method.
     * @param {Object} [obj=this] Object to inspect.
     */
    prop: function(prop, obj) {
      obj = obj || this;
      return _.isFunction(obj[prop]) ? obj[prop].call(obj) : obj[prop];
    },
    
    /**
     * Defines location of Backdrop service
     * TODO: use environment configuration
     */
    baseUrl: '//limelight.dev.gov.uk:5000/',
    
    /**
     * Constructs a Backdrop query for the current environment
     */
    url: function() {
      // add query parameters
      var params = _.extend({}, this.prop('queryParams'));
      
      // convert date parameters
      _.each(params, function (value, key) {
        if (this.moment.isMoment(value)) {
          params[key] = value.format(this.defaultDateFormat);
        }
      });

      return this.baseUrl + this.queryUrl + '/?' + $.param(params);
    }
  });

  return Collection;
});
