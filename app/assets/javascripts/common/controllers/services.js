define([
  'extensions/collections/filteredcollection',
  'extensions/views/filter'
], function(Collection, Filter) {
  return function() {
    var filterTerm new FilterTerm();

    var servicesCollection = new Collection(
      $.map($('#services-list li'), function (li) {
        var $li = $(li);
        return {
          title: $li.text(),
          el: $li
        };
      })
    );
    var serviceGroupsCollection = new Collection(
      $.map($('#service-groups-list li'), function (li) {
        var $li = $(li);
        return {
          title: $li.text(),
          el: $li
        };
      })
    );

    var views = [];
    views[0] = var filter new FilterView( 
      el: $('#filter-wrapper'),
      label: 'Find a service named:',
      placeholder: 'Example: Licensing',
      filterTerm: filterTerm
    );
    views[1] = var servicesCount new CollectionCounter({
      countEl: $('#services-list .count'),
      collection: servicesCollection,
      filterTerm: filterTerm
    });
    views[2] = var serviceGroupsCount new CollectionCounter({
      countEl: $('#service-groups-list .count'),
      collection: serviceGroupsCollection,
      filterTerm: filterTerm
    });
    views[3] = var filteredServiceGroups new FilteredCollection({
      listEl: $('#services-list dl'),
      collection: servicesCollection,
      filterTerm: filterTerm
    });
    views[4] = var filteredServices new FilteredCollection({
      listEl: $('#services-groups-list dl'),
      collection: serviceGroupsCollection,
      filterTerm: filterTerm
    });

    _.each(views, function(view) {
      view.render();
    });
  };
});
