define([
  'extensions/views/graph/headline',
  'extensions/models/query'],
  function(Headline, Query) {
    describe("Headline", function() {
      describe("initialize", function() {
        it("should initialize with a model", function() {
          var model = new Query();
          spyOn(model, 'on');
          new Headline({
            model: model
          });
          expect(model.on).toHaveBeenCalled();
        });
      });

      describe("rendering", function() {
        var headline, model;

        beforeEach(function () {
          model = new Query({
            period: 'week'
          });
          headline = new Headline({
            model: model
          });
        });

        it("should render headline", function() {
          jasmine.renderView(headline, function () {
            expect(headline.$el).toHaveText("Total form submissions per week over the last 9 weeks");
          });
        });
      });
    });
  });
