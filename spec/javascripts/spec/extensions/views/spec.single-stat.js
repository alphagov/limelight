define([
  'extensions/views/single-stat',
  'extensions/collections/collection'
], function (SingleStatView, Collection) {
  describe("SingleStatView", function () {

    var collectionOptions = {
      checkName: "anything",
      serviceName: "anything"
    };

    describe("extracting the stat from the collection", function () {

      var stubCollection = {
        on: function () {},
        getValue: function () { return 5; },
        getCurrentSelection: function () {
          return {
            selectedModel: null,
            selectedModelIndex: null
          };
        }
      }

      it("Should try to get a value from a collection", function () {
        spyOn(stubCollection, 'getValue').andCallThrough();
        view = new SingleStatView({
          collection: stubCollection,
          getValue: function () { return this.collection.getValue(); } 
        });
        jasmine.renderView(view, function () {
          expect(stubCollection.getValue).toHaveBeenCalled();
          expect(view.$el.html()).toEqual("<strong>5</strong>");
        });
      });
    });

    it("should display calculated value in a strong tag", function () {
      var collection = new Collection([{
        "foo": 'bar'
      }], collectionOptions);

      var view = new SingleStatView({
        collection: collection,
        getValue: function () {
          return this.collection.first().get('foo');
        }
      });

      jasmine.renderView(view, function () {
        expect(view.$el.html()).toEqual("<strong>bar</strong>");
      });
    });

    it("should display calculated value and label", function () {
      var collection = new Collection([{
        "foo": 'bar'
      }], collectionOptions);

      var view = new SingleStatView({
        collection: collection,
        getValue: function () {
          return this.collection.first().get('foo');
        },
        getLabel: function () {
          return 'label';
        }
      });

      jasmine.renderView(view, function () {
        expect(view.$el.html()).toEqual("<strong>bar</strong> label");
      });
    });

    it("should not display different values when the selection changes by default", function () {
      var collection = new Collection([{
        "foo": 'bar'
      }], collectionOptions);

      var view = new SingleStatView({
        collection: collection,
        getValue: function () {
          return this.collection.first().get('foo');
        },
        getLabel: function () {
          return 'label';
        }
      });

      jasmine.renderView(view, function () {
        expect(view.$el.html()).toEqual("<strong>bar</strong> label");
        collection.selectItem(0);
        expect(view.$el.html()).toEqual("<strong>bar</strong> label");
      });
    });

    it("should display different values when the selection changes when configured", function () {
      var collection = new Collection([{
        foo: 'bar',
        a: 'b'
      }], collectionOptions);

      var view = new SingleStatView({
        changeOnSelected: true,
        collection: collection,
        getValue: function () {
          return this.collection.first().get('foo');
        },
        getLabel: function () {
          return 'label';
        },
        getValueSelected: function (selection) {
          return selection.selectedModel.get('a');
        },
        getLabelSelected: function (selection) {
          return 'selected';
        }
      });

      jasmine.renderView(view, function () {
        expect(view.$el.html()).toEqual("<strong>bar</strong> label");
        collection.selectItem(0);
        expect(view.$el.html()).toEqual("<strong>b</strong> selected");
        collection.selectItem(null);
        expect(view.$el.html()).toEqual("<strong>bar</strong> label");
      });
    });
  });
});
