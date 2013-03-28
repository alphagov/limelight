define([
  'require',
  'extensions/multicollection',
  '../models/group',
  './applications',
  './byauthority'
],
function (require, MultiCollection, Group, Total, ByAuthority) {
  
  var TotalAndByAuthority = MultiCollection.extend({
    
    collections: [Total, ByAuthority],
    
    model: Group,
    
    /**
     * Zips up total applications and applications by authority.
     */
    parse: function () {
      var totalCollection = this.collectionInstances[0];
      var byAuthorityCollection = this.collectionInstances[1];
      
      var data = [];
      byAuthorityCollection.each(function (model) {
        var attributes = {
          id: model.get('authorityUrlSlug'),
          values: model.get('values')
        };
        if (model.get('authorityName')) {
          attributes.title = model.get('authorityName')[0];
        } else {
          attributes.title = model.get('authorityUrlSlug');
        }
        if (model.get('licenceName')) {
          attributes.subTitle = model.get('licenceName')[0];
        }
        data.push(attributes);
      });
      
      data.unshift({
        id: 'total',
        title: 'Total applications',
        values: totalCollection.models
      });
      return data;
    }
    
  });
  
  return TotalAndByAuthority;
});
