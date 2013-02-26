define([
    'extensions/model',
    'backbone'
],
function (Model, Backbone) {
    describe("Model", function() {
        it("inherits from Backbone.Model", function() {
            var model = new Model();
            expect(model instanceof Backbone.Model).toBe(true);
        });

        it("defines a custom property", function() {
            var model = new Model();
            expect(model.customProperty).toBe(true);
        });
    });
});
