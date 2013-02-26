define([
    'extensions/collection',
    'backbone'
],
function (Collection, Backbone) {
    describe("Collection", function() {
        it("inherits from Backbone.Collection", function() {
            var collection = new Collection();
            expect(collection instanceof Backbone.Collection).toBe(true);
        });
    });
});
