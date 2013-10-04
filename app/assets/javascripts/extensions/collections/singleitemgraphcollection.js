define([
  './graphcollection'
], function(
  GraphCollection
) {
  var SingleItemGraphCollection = GraphCollection.extend({

    initialize: function (model, options) {
      options.collections = [
        {
          collection: options.conversionCollection
        }
      ];

      GraphCollection.prototype.initialize.apply(this, [model, options]);
    }

  });

  return SingleItemGraphCollection;

});