define([
  'require',
  '../response',
  '../random',
  'lodash'
], function (require, Response, Random, _) {
  
  var LicensingResponse = Response.extend({
    
    initialize: function () {
      this.rnd = new Random(1);
    },
    
    url: /\/licensing\/?\?(.*group_by=authorityUrlSlug.*period=all)/,
    
    getData: function (query) {
      
      var values = [
        {
          authorityUrlSlug: 'westminster',
          _count: this.rnd(1e3, 3e3),
          authorityName: ['Westminster']
        },
        {
          authorityUrlSlug: 'croydon',
          _count: this.rnd(1e3, 4e3),
          authorityName: ['Croydon']
        },
        {
          authorityUrlSlug: 'wandsworth',
          _count: this.rnd(1e3, 2e4),
          authorityName: ['Wandsworth']
        },
        {
          authorityUrlSlug: 'lambeth',
          _count: this.rnd(1e3, 2e3),
          authorityName: ['Lambeth']
        },
        {
          authorityUrlSlug: 'bristol',
          _count: this.rnd(1e3, 1e4),
          authorityName: ['Bristol']
        }
      ];
      
      var licenceUrlSlug = query.filter_by;
      var licenceName = {
        "application-to-licence-a-street-collection": "Application to licence a street collection",
        "register-as-a-scrap-metal-dealer": "Register as a scrap metal dealer"
      }[licenceUrlSlug];
      _.each(values, function (value, key) {
        value.licenceName = [licenceName];
      });
      
      var data = {
        values: values
      };
      if (query.start_at) {
        data._start_at = query.start_at.originalValue;
      }
      if (query.end_at) {
        data._end_at = query.end_at.originalValue;
      }
      return data;
    }
  });
  
  return LicensingResponse;
});
