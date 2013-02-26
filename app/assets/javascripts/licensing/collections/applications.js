define([
    'extensions/collection'
],
function (Collection) {
    var Applications = Collection.extend({
        url: 'http://datainsight-frontend.dev.gov.uk:5000/licensing',
        parse: function (response) {
            return response.data;
        }
    });
    
    return Applications;
});
