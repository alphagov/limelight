define([
    'licensing/collections/applications'
], function(Applications) {
    
    if (window.jasmine) {
        return;
    }
    
    var applications = new Applications();
    applications.fetch({
        success: function (e) {
            console.log(arguments);
        },
        error: function (e) {
            console.error(arguments);
        }
    })
    
});
