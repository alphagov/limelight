define([
    'backbone',
    'moment'
],
function (Backbone, moment) {
    var Model = Backbone.Model.extend({
        customProperty: true,
        
        parse: function (attributes) {
            attributes = Backbone.Model.prototype.parse(attributes);
            if (attributes['_timestamp']) {
                var timestamp = moment(attributes['_timestamp']);
                if (timestamp.isValid()) {
                    attributes['_timestamp'] = timestamp;
                } else {
                    console.warn(attributes['_timestamp'], 'is not a valid date');
                }
            }
            
            return attributes;
        }
    });
    
    return Model;
});
