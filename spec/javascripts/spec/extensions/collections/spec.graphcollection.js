define([
  'extensions/collections/graphcollection',
  'extensions/collections/collection',
  'extensions/models/group'
],
function (GraphCollection, Collection, Group) {
  
  describe("GraphCollection", function() {
    
    describe("initialize", function() {
      
      it("uses Group models", function () {
        expect(GraphCollection.prototype.model).toBe(Group);
      });
      
      it("listens to selection changes in all groups", function () {
        var group0 = new Group({
          values: [
            { a: 'one' },
            { a: 'two' }
          ]
        }, { parse: true });
        var group1 = new Group({
          values: [
            { a: 'three' },
            { a: 'four' }
          ]
        }, { parse: true });
        spyOn(GraphCollection.prototype, "onGroupChangeSelected");
        var collection = new GraphCollection();
        collection.reset([ group0, group1 ]);
        
        group0.get('values').selectItem(1);
        expect(collection.onGroupChangeSelected).toHaveBeenCalledWith(
          group0, 0, group0.get('values').at(1), 1
        );
        
        group1.get('values').selectItem(0);
        expect(collection.onGroupChangeSelected).toHaveBeenCalledWith(
          group1, 1, group1.get('values').at(0), 0
        );
      });
    });
    
    describe("parse", function () {
      it("assigns constituent collections as 'values' attribute", function () {
        var collection = new GraphCollection([], {});
        collection.collectionInstances = [
          new Collection([ { foo: 'bar' } ]),
          new Collection([ { foo: 'baz' } ])
        ];
        collection.reset(collection.parse(), { parse: true });
        expect(collection.at(0).get('values').at(0).get('foo')).toEqual('bar');
        expect(collection.at(1).get('values').at(0).get('foo')).toEqual('baz');
      });
      
      it("assigns id and title properties as attributes when available", function () {
        var subCollection1 = new Collection([ { foo: 'bar' } ]);
        subCollection1.id = 'id1';
        subCollection1.title = 'Title 1';
        var subCollection2 = new Collection([ { foo: 'baz' } ]);
        subCollection2.id = 'id2';
        subCollection2.title = 'Title 2';
        var collection = new GraphCollection([], {});
        collection.collectionInstances = [
          subCollection1,
          subCollection2
        ];
        collection.reset(collection.parse(), { parse: true });
        expect(collection.at(0).get('id')).toEqual('id1');
        expect(collection.at(0).get('title')).toEqual('Title 1');
        expect(collection.at(1).get('id')).toEqual('id2');
        expect(collection.at(1).get('title')).toEqual('Title 2');
      });
    });
    

    describe("selection", function () {
      
      var collection, spy;
      beforeEach(function() {
        spy = jasmine.createSpy();
        var group0 = new Group({
          values: [
            { a: 'one' },
            { a: 'two' }
          ]
        }, { parse: true });
        var group1 = new Group({
          values: [
            { a: 'three' },
            { a: 'four' }
          ]
        }, { parse: true });
        collection = new GraphCollection();
        collection.on('change:selected', spy);
        collection.reset([ group0, group1 ]);
      });
      
      describe("selectItem", function () {
        
        it("selects a group", function () {
          collection.selectItem(1);
          expect(collection.selectedItem).toBe(collection.at(1));
          expect(collection.selectedIndex).toEqual(1);
          expect(collection.at(0).get('values').selectedItem).toBeFalsy();
          expect(collection.at(1).get('values').selectedItem).toBeFalsy();
          expect(spy).toHaveBeenCalledWith(collection.at(1), 1, null, null);
        });
        
        it("selects an item in a group and the group and unselects all other groups", function () {
          collection.selectItem(1, 1);
          expect(collection.selectedItem).toBe(collection.at(1));
          expect(collection.selectedIndex).toEqual(1);
          expect(collection.at(0).get('values').selectedItem).toBeFalsy();
          expect(collection.at(1).get('values').selectedItem).toBe(collection.at(1).get('values').at(1));
          expect(spy).toHaveBeenCalledWith(collection.at(1), 1, collection.at(1).get('values').at(1), 1);
          
          collection.selectItem(0, 0);
          expect(collection.selectedItem).toBe(collection.at(0));
          expect(collection.selectedIndex).toEqual(0);
          expect(collection.at(0).get('values').selectedItem).toBe(collection.at(0).get('values').at(0));
          expect(collection.at(1).get('values').selectedItem).toBeFalsy();
          expect(spy).toHaveBeenCalledWith(collection.at(0), 0, collection.at(0).get('values').at(0), 0);
        });
        
        it("selects an item in all groups", function () {
          collection.selectItem(null, 1);
          expect(collection.selectedItem).toBeFalsy();
          expect(collection.selectedIndex).toBeFalsy();
          expect(collection.at(0).get('values').selectedItem).toBe(collection.at(0).get('values').at(1));
          expect(collection.at(1).get('values').selectedItem).toBe(collection.at(1).get('values').at(1));
          expect(spy).toHaveBeenCalledWith(null, null, [
            collection.at(0).get('values').at(1),
            collection.at(1).get('values').at(1)
          ], 1);
          
          collection.selectItem(null, 0);
          expect(collection.selectedItem).toBeFalsy();
          expect(collection.selectedIndex).toBeFalsy();
          expect(collection.at(0).get('values').selectedItem).toBe(collection.at(0).get('values').at(0));
          expect(collection.at(1).get('values').selectedItem).toBe(collection.at(1).get('values').at(0));
          expect(spy).toHaveBeenCalledWith(null, null, [
            collection.at(0).get('values').at(0),
            collection.at(1).get('values').at(0)
          ], 0);
        });
        
        it("unselects group and item", function () {
          collection.selectItem(1, 1);
          collection.selectItem(null);
          expect(collection.selectedItem).toBe(null);
          expect(collection.selectedIndex).toBe(null);
          expect(collection.at(0).get('values').selectedItem).toBeFalsy();
          expect(collection.at(1).get('values').selectedItem).toBeFalsy();
          expect(spy).toHaveBeenCalledWith(null, null, null, null);
        });
        
        it("unselects item but keeps group", function () {
          collection.selectItem(1, 1);
          collection.selectItem(1, null);
          expect(collection.selectedItem).toBe(collection.at(1));
          expect(collection.selectedIndex).toEqual(1);
          expect(collection.at(0).get('values').selectedItem).toBeFalsy();
          expect(collection.at(1).get('values').selectedItem).toBeFalsy();
          expect(spy).toHaveBeenCalledWith(collection.at(1), 1, null, null);
        });

        it("allows suppressing the change:selected event", function () {
          collection.selectItem(1, 1, { silent: true });
          expect(spy).not.toHaveBeenCalled();
        });
        
      });

      describe("getCurrentSelection", function () {

        it("retrieves an object with an empty selection when nothing is selected", function () {
          collection.selectItem(null);
          var currentSelection = collection.getCurrentSelection();
          expect(currentSelection.selectedGroup).toBe(null);
          expect(currentSelection.selectedGroupIndex).toBe(null);
          expect(currentSelection.selectedModel).toBe(null);
          expect(currentSelection.selectedModelIndex).toBe(null);
        });

        it("retrieves an object with the currently selected group", function () {
          collection.selectItem(1, null);
          var currentSelection = collection.getCurrentSelection();
          expect(currentSelection.selectedGroup).toBe(collection.at(1));
          expect(currentSelection.selectedGroupIndex).toBe(1);
          expect(currentSelection.selectedModel).toBe(null);
          expect(currentSelection.selectedModelIndex).toBe(null);
        });

        it("retrieves an object with the currently selected group and item", function () {
          collection.selectItem(1, 1);
          var currentSelection = collection.getCurrentSelection();
          expect(currentSelection.selectedGroup).toBe(collection.at(1));
          expect(currentSelection.selectedGroupIndex).toBe(1);
          expect(currentSelection.selectedModel).toBe(collection.at(1).get('values').at(1));
          expect(currentSelection.selectedModelIndex).toBe(1);
        });

        it("retrieves an object with the currently selected items", function () {
          collection.selectItem(null, 1);
          var currentSelection = collection.getCurrentSelection();
          expect(currentSelection.selectedGroup).toBe(null);
          expect(currentSelection.selectedGroupIndex).toBe(null);
          expect(currentSelection.selectedModel).toEqual([
            collection.at(0).get('values').at(1),
            collection.at(1).get('values').at(1)
          ]);
          expect(currentSelection.selectedModelIndex).toBe(1);
        });
      });
    });

    describe("at", function () {
      var collection;
      beforeEach(function() {
        collection = new GraphCollection([
          { id: 'first' }, { id: 'second' }
        ]);
        collection.at(0).set('values', new Collection([
          { a: 1, b: 2 },
          { a: 3, b: 4 }
        ]))
        collection.at(1).set('values', new Collection([
          { a: 5, b: 6 },
          { a: 7, b: null }
        ]))
      });

      it("retrieves a group", function () {
        expect(collection.at(1).get('id')).toEqual('second');
      });

      it("retrieves an item in a group", function () {
        expect(collection.at(1, 1).get('a')).toEqual(7);
        expect(collection.at(1, 1).get('b')).toBe(null);
      });
    });

    describe("aggregates", function () {

      describe("sum", function () {
        describe("default case", function () {
          var collection;
          beforeEach(function() {
            collection = new GraphCollection([{}, {}]);
            collection.at(0).set('values', new Collection([
              { a: 1, b: 2 },
              { a: 3, b: 4 }
            ]))
            collection.at(1).set('values', new Collection([
              { a: 5, b: 6 },
              { a: 7, b: null }
            ]))
          });

          it("sums a given attribute for all items in all groups", function () {
            expect(collection.sum('a')).toEqual(16);
            expect(collection.sum('b')).toEqual(12);
          });

          it("sums a given attribute for all items in a specific group", function () {
            expect(collection.sum('a', 1)).toEqual(12);
            expect(collection.sum('b', 1)).toEqual(6);
          });

          it("sums a given attribute for a specific item in all groups", function () {
            expect(collection.sum('a', null, 1)).toEqual(10);
            expect(collection.sum('b', null, 1)).toEqual(4);
          });
        });

        describe("null case", function () {
          var collection;
          beforeEach(function() {
            collection = new GraphCollection([{}, {}]);
            collection.at(0).set('values', new Collection([
              { a: null, b: null },
              { a: null, b: null }
            ]))
            collection.at(1).set('values', new Collection([
              { a: null, b: null },
              { a: null, b: null }
            ]))
          });

          it("sums a given attribute for all items in all groups", function () {
            expect(collection.sum('a')).toEqual(null);
            expect(collection.sum('b')).toEqual(null);
          });

          it("sums a given attribute for all items in a specific group", function () {
            expect(collection.sum('a', 1)).toEqual(null);
            expect(collection.sum('b', 1)).toEqual(null);
          });

          it("sums a given attribute for a specific item in all groups", function () {
            expect(collection.sum('a', null, 1)).toEqual(null);
            expect(collection.sum('b', null, 1)).toEqual(null);
          });
        });
      });

      describe("fraction", function () {
        var collection;
        beforeEach(function() {
          collection = new GraphCollection([{}, {}]);
          collection.at(0).set('values', new Collection([
            { a: 1, b: 2 },
            { a: 3, b: 4 }
          ]))
          collection.at(1).set('values', new Collection([
            { a: 5, b: 6 },
            { a: 7, b: null }
          ]))
        });
        
        it("always returns 1 when applied to all groups and items", function () {
          expect(collection.fraction('a')).toEqual(1);
          expect(collection.fraction('b')).toEqual(1);
        });

        it("calculates the fraction for a given attribute for all items in a specific group", function () {
          expect(collection.fraction('a', 1)).toBeCloseTo(0.75, 0.01);
          expect(collection.fraction('b', 1)).toBeCloseTo(0.60, 0.01);
        });

        it("calculates the fraction for a given attribute for a specific item in all groups", function () {
          expect(collection.fraction('a', null, 1)).toBeCloseTo(0.625, 0.01);
          expect(collection.fraction('b', null, 1)).toBeCloseTo(0.33, 0.01);
        });

        it("calculates the fraction for a given attribute for a specific item in a specific group", function () {
          expect(collection.fraction('a', 1, 1)).toBeCloseTo(0.70, 0.01);
          expect(collection.fraction('b', 1, 1)).toEqual(0);
        });
      });
    });

  });
});
