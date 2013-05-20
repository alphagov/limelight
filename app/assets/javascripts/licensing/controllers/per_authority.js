define([
  'licensing/collections/applications-totalandtop5licences-weekly',
  'licensing/views/applicationsperlicencegraph',
  'licensing/collections/all-entities-and-applications-lastweek',
  'licensing/views/applicationstable',
  'extensions/views/tabs'
], function(GraphCollection, GraphView, TableCollection, TableView, Tabs) {
  
  var authorityUrlSlug = $('#wrapper').data('authority-url-slug');
  
  if (!$('.lte-ie8').length) {
    var graphCollection = new GraphCollection([], {
      filterBy: {
        authorityUrlSlug: authorityUrlSlug
      }
    });

    var graphView = new GraphView({
      el: $('#applications-by-licence'),
      collection: graphCollection
    });
    
    var graphNav = new Tabs({
        el: $("#applications-nav"), 
        model: graphCollection.query, 
        attr: 'period',
        tabs: [{id: "week", name: "Weekly"}, {id:"month", name:"Monthly"}]
        });

    graphCollection.query.set('period', 'week');
  }
  
  var tableCollection = new TableCollection([], {
    groupBy: 'licenceUrlSlug',
    filterBy: {
      authorityUrlSlug: authorityUrlSlug
    }
  });
  
  var tableView = new TableView({
    el: $('#applications-table'),
    collection: tableCollection
  });
  
  tableCollection.fetch();
});
