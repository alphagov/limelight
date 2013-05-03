define([
  'extensions/collections/collection'
], function(Collection) {
  var ApplicationsConversionCollection = Collection.extend({
    
    queryUrl: 'licensing_conversion',

    queryId: 'applications-conversion',

    steps: ['apply_1', 'apply_2', 'apply_3'],
    
    stepTitles: {
      apply_1: 'Start',
      apply_2: 'Step 1',
      apply_3: 'End'
    },
    
    queryParams: function() {
      return {
        group_by: 'stepUrlSlug'
      };
    },

    parse: function (response) {
      var titles = this.stepTitles;
      var data = response.data;
      _.each(data, function (step) {
        step.title = titles[step.stepUrlSlug];
      });
      return data;
    },

    comparator: function(step1, step2) {
      var index1 = _.indexOf(this.steps, step1.get('stepUrlSlug'));
      var index2 = _.indexOf(this.steps, step2.get('stepUrlSlug'));

      if (index1 == -1 && index2 == -1) {
        return this.compare(
          step1.get('stepUrlSlug').toLowerCase(),
          step2.get('stepUrlSlug').toLowerCase()
        );
      } else if (index1 == -1) {
        return 1;
      } else if (index2 == -1) {
        return -1;
      } else {
        return this.compare(index1, index2);
      }
    },

    compare: function(a, b) {
      if (a < b) {
        return -1;
      } else if(a > b) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  return ApplicationsConversionCollection;
});
