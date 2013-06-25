define([
  'extensions/collections/conversioncollection'
], function(ConversionCollection) {
  var ApplicationsConversionCollection = ConversionCollection.extend({
    
    serviceName: 'licensing',
    apiName: 'journey',

    queryId: 'applications-conversion',

    steps: [
      'licensingUserJourney:downloadFormPage',
      'licensingUserJourney:submitApplicationPage',
      'licensingUserJourney:end'
    ],
    
    stepTitles: {
      'licensingUserJourney:downloadFormPage': 'Download form',
      'licensingUserJourney:submitApplicationPage': 'Submit application',
      'licensingUserJourney:end': 'Done'
    },

    queryParams: function() {
      var query = ConversionCollection.prototype.queryParams.apply(this, arguments);
      query.filter_by = "dataType:licensing_overview_journey";
      return query;
    }
    
  });

  return ApplicationsConversionCollection;
});
