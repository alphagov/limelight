define([
  'extensions/views/view',
  'tpl!licensing/templates/overview.html',
  'licensing/views/applicationsgraph',
  'licensing/views/applications-conversion-graph',
  'licensing/views/top5table'
], function(View, template, ApplicationsGraph, ConversionGraph, Top5Table) {
  var Overview = View.extend({
    template: template,
    
    title: 'Licensing performance - Overview',
    
    views: {
      '#total-applications': {
        view: ApplicationsGraph,
        options: function () {
          return {
            collection: this.applicationsCollection
          };
        }
      },
      '#applications-conversion-graph': {
        view: ConversionGraph,
        options: function () {
          return {
            collection: this.conversionCollection
          };
        }
      },
      '#top5-licences-table': {
        view: Top5Table,
        options: function () {
          return {
            title: 'Licence',
            collection: this.top5LicencesCollection
          };
        }
      },
      '#top5-authorities-table': {
        view: Top5Table,
        options: function () {
          return {
            title: 'Authority',
            collection: this.top5AuthoritiesCollection
          };
        }
      }
    }
  });
  
  return Overview;
});
