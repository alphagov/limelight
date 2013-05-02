define([
  'licensing/collections/applications-conversion'
], function(Collection) {
  describe("ApplicationsConversion", function() {
    describe("Sorting", function() {
      it("should not change order if they follow the specified sort order", function() {
        var models = [
          {stepUrlSlug: "apply_1", events: 54321},
          {stepUrlSlug: "apply_2", events: 4321},
          {stepUrlSlug: "apply_3", events: 321}
        ];
        var collection = new Collection(models, {});

        expect(collection.at(0).get('stepUrlSlug')).toEqual("apply_1");
        expect(collection.at(1).get('stepUrlSlug')).toEqual("apply_2");
        expect(collection.at(2).get('stepUrlSlug')).toEqual("apply_3");
      });

      it("should reorder according to a provided sort order", function() {
        var models = [
          {stepUrlSlug: "apply_2", events: 4321},
          {stepUrlSlug: "apply_1", events: 54321},
          {stepUrlSlug: "apply_3", events: 321}
        ];
        var collection = new Collection(models, {});

        expect(collection.at(0).get('stepUrlSlug')).toEqual("apply_1");
        expect(collection.at(1).get('stepUrlSlug')).toEqual("apply_2");
        expect(collection.at(2).get('stepUrlSlug')).toEqual("apply_3");
      });

      it("should place unrecognised keys at the end of the collection", function() {
        var models = [
          {stepUrlSlug: "afly_1", events: 4321},
          {stepUrlSlug: "apply_1", events: 54321},
          {stepUrlSlug: "apply_3", events: 321}
        ];
        var collection = new Collection(models, {});

        expect(collection.at(0).get('stepUrlSlug')).toEqual("apply_1");
        expect(collection.at(1).get('stepUrlSlug')).toEqual("apply_3");
        expect(collection.at(2).get('stepUrlSlug')).toEqual("afly_1");
      });

      it("should sort multiple unrecognised keys alphabetically", function() {
        var models = [
          {stepUrlSlug: "afly_2", events: 4321},
          {stepUrlSlug: "Afly_1", events: 54321},
          {stepUrlSlug: "apply_3", events: 321}
        ];
        var collection = new Collection(models, {});

        expect(collection.at(0).get('stepUrlSlug')).toEqual("apply_3");
        expect(collection.at(1).get('stepUrlSlug')).toEqual("Afly_1");
        expect(collection.at(2).get('stepUrlSlug')).toEqual("afly_2");
      });
    })
  });
});