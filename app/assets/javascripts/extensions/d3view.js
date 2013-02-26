define([
    'extensions/view',
    'd3'
],
function (View, d3) {
    var D3View = View.extend({
        
        d3: d3,
        
        initialize: function () {
            View.prototype.initialize.apply(this, arguments);
        }
        
    });
    
    return D3View;
});
