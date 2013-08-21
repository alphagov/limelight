define([
  'extensions/collections/filteredcollection',
  'extensions/views/filter'
], function(Collection, Filter) {
  return function() {
    var collection = new Collection(
      $.map($('#services-list li'), function (li) {
        var $li = $(li);
        return {
          title: $li.text(),
          el: $li
        };
      })
    );

    var view = new Filter({
      el: $('#filter-wrapper'),
      listEl: $('#services-list dl'),
      countEl: $('#services-list .count'),
      label: 'Find a service named:',
      placeholder: 'Example: Licensing',
      collection: collection
    });
    /*var view = new compositefilter({*/
    /*el: $('#filter-wrapper'),*/
    /*listel: [$('#services-list dl')],*/
    /*countel: [$('#services-list .count')],*/
    /*label: 'find a service named:',*/
    /*placeholder: 'example: licensing',*/
    /*collection: [collection]*/
    /*});*/

    view.render();
  };
});
