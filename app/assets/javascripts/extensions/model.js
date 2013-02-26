define([
    'backbone'
],
function (Backbone) {
    var Model = Backbone.Model.extend({
        customProperty: true
    });
    
    return Model;
});
