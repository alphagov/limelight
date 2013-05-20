define([
  'licensing/collections/applications-totalandtop5authorities-weekly',
  'licensing/views/applicationsperlicencegraph',
  'licensing/collections/all-entities-and-applications-lastweek',
  'licensing/views/applicationstable',
  'extensions/views/tabs'
], function(GraphCollection, GraphView, TableCollection, TableView, Tabs) {
  
  var licenceUrlSlug = $('#wrapper').data('licence-url-slug');
  
  if (!$('.lte-ie8').length) {
    var graphCollection = new GraphCollection([], {
      filterBy: {
        licenceUrlSlug: licenceUrlSlug
      }
    });

    var graphView = new GraphView({
      el: $('#applications-by-authority'),
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
    groupBy: 'authorityUrlSlug',
    filterBy: {
      licenceUrlSlug: licenceUrlSlug
    }
  });

  var tableView = new TableView({
    el: $('#applications-table'),
    collection: tableCollection,
    title: 'Authority'
  });

  tableCollection.fetch();
  
});
