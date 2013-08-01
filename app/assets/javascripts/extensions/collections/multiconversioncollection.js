define([
  './graphcollection'
], function(
  GraphCollection
) {
  var MultiConversionCollection = GraphCollection.extend({

    initialize: function (model, options) {
      options.collections = [
        {
          collection: options.conversionCollection,
          options: { weeksAgo: 0 }
        },
        {
          collection: options.conversionCollection,
          options: { weeksAgo: 1 }
        }
      ];

      GraphCollection.prototype.initialize.apply(this, [model, options]);
    }

  });

  return MultiConversionCollection;

});