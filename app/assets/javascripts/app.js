define([
    'licensing/collections/applications',
    'licensing/views/totalapplications',
    'mockapi'
], function(ApplicationsCollection, TotalApplicationsView) {
    
    if (window.jasmine) {
        return;
    }
    
    var collection = new ApplicationsCollection();
    
    var view = new TotalApplicationsView({
      el: $('#total-applications'),
      collection: collection
    });
    
    collection.fetch();
});
