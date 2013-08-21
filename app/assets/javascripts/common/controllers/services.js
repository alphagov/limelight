define([
  'extensions/collections/filteredcollection',
  'extensions/models/model',
  'extensions/views/filter-view',
  'extensions/views/collection-counter',
  'extensions/views/collection-filter'
], function(Collection, Model, Filter, CollectionCounter, FilteredCollection) {
  return function() {
    var filterTerm = new Model();

    var servicesCollection = new Collection(
      $.map($('#services-list li'), function (li) {
        var $li = $(li);
        return {
          title: $li.text(),
          el: $li
        };
      }), {filterTerm: filterTerm}
    );

    var serviceGroupsCollection = new Collection(
      $.map($('#service-groups-list li'), function (li) {
        var $li = $(li);
        return {
          title: $li.text(),
          el: $li
        };
      }), {filterTerm: filterTerm}
    ); 

    var filter = new Filter({ 
      el: $('#filter-wrapper'),
      label: 'Find a service named:',
      placeholder: 'Example: Licensing',
      model: filterTerm
    });
    var servicesCount = new CollectionCounter({
      countEl: $('#services-list .count'),
      collection: servicesCollection.filtered
    });
    var serviceGroupsCount = new CollectionCounter({
      countEl: $('#service-groups-list .count'),
      collection: serviceGroupsCollection
    });
    var filteredServiceGroups = new FilteredCollection({
      listEl: $('#services-list dl'),
      collection: servicesCollection.filtered
    });
    var filteredServices = new FilteredCollection({
      listEl: $('#services-groups-list dl'),
      collection: serviceGroupsCollection
    });
  };
});
