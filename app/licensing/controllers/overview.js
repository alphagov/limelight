define([
  'licensing/views/overview',
  'licensing/collections/applications-top5-lastweek',
  'licensing/collections/applications-total-weekly',
  'extensions/collections/graphcollection',
  'licensing/collections/applications-conversion'
],
function (Overview, Top5Collection, ApplicationsCollection, GraphCollection, ConversionCollection) {
  
  var Controller = function (req, res) {
    var el;
    if (_.isObject(req) && req.el) {
      el = req.el;
    }
    
    var applicationsCollection = new GraphCollection(null, {
      collections: [ApplicationsCollection]
    });

    var conversionCollection = new GraphCollection(null, {
      collections: [ConversionCollection]
    });

    var top5LicencesCollection = new Top5Collection([], {
      groupBy: 'licenceUrlSlug'
    });
    
    var top5AuthoritiesCollection = new Top5Collection([], {
      groupBy: 'authorityUrlSlug'
    });
    
    var view = new Overview({
      top5LicencesCollection: top5LicencesCollection,
      top5AuthoritiesCollection: top5AuthoritiesCollection,
      applicationsCollection: applicationsCollection,
      conversionCollection: conversionCollection,
      el: el
    });
    
    applicationsCollection.fetch();
    conversionCollection.fetch();
    top5AuthoritiesCollection.fetch();
    top5LicencesCollection.fetch();
    
    return view;
  };
  
  Controller.path = 'licensing/controllers/overview';
  
  return Controller;
});
