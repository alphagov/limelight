define([
  'licensing/views/overview',
  'licensing/collections/applications-top5-lastweek',
  'licensing/collections/applications-total-weekly'
],
function (Overview, Top5Collection, GraphCollection) {
  
  var Controller = function (req, res) {
    
    var el;
    if (_.isObject(req) && req.el) {
      el = req.el;
    }
    
    var top5LicencesCollection = new Top5Collection([], {
      groupBy: 'licenceUrlSlug'
    });
    
    var top5AuthoritiesCollection = new Top5Collection([], {
      groupBy: 'authorityUrlSlug'
    });
    
    var graphCollection = new GraphCollection();
    
    var view = new Overview({
      top5LicencesCollection: top5LicencesCollection,
      top5AuthoritiesCollection: top5AuthoritiesCollection,
      graphCollection: graphCollection,
      el: el
    });
    
    graphCollection.fetch();
    top5AuthoritiesCollection.fetch();
    top5LicencesCollection.fetch();
    
    return view;
  };
  
  Controller.path = 'licensing/controllers/overview';
  
  return Controller;
});
