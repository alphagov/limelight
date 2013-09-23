define([
  'extensions/views/graph/stack',
  'extensions/collections/collection'
],
function (Stack, Collection) {
  describe("Stack component", function () {
    var el, wrapper, collection, layers, stack;
    beforeEach(function() {
      el = $('<div></div>').appendTo($('body'));
      wrapper = Stack.prototype.d3.select(el[0]).append('svg').append('g');
      collection = new Collection([
        {
          testAttr: 'b',
          values: new Collection([
            { a: 1, b: 2},
            { a: 4, b: 5},
            { a: 7, b: 8},
            { a: 9, b: 10},
            { a: 11, b: 12}
          ])
        },
        {
          testAttr: 'c',
          values: new Collection([
            { a: 1, b: 3},
            { a: 4, b: 6},
            { a: 7, b: 9},
            { a: 10, b: 11},
            { a: 12, b: 13}
          ])
        }
      ]);


      stack = Stack.prototype.d3.layout.stack()
        .values(function (group) {
          return group.get('values').models;
        })
        .y(function (model, index) {
          var y = model.get('b');
          if (y !== null) {
            y += index;
          }
          return y;
        });
      layers = stack(collection.models.slice().reverse());
    });
    
    afterEach(function() {
      el.remove();
    });
    
    describe("render", function() {

      var view;
      beforeEach(function() {
        view = new Stack({
          interactive: false,
          wrapper: wrapper,
          collection: collection,
          scales: {
            y: function (x) {
              return x * 2;
            }
          },
          graph: {
            layers: layers
          },
          x: function (group, groupIndex, model, index) {
            return model.get('a') + index;
          },
          y: function (group, groupIndex, model, index) {
            return model.y + model.y0;
          },
          y0: function (group, groupIndex, model, index) {
            return model.y0;
          }
        });
      });
      
      it("renders a stack consisting of a stroked path and a filled path for each item in the collection", function() {
        view.render();
        var group1 = wrapper.selectAll('g.group:nth-child(1)');
        expect(group1.selectAll('path.line').attr('d')).toEqual('M1,6L5,14L9,22L13,28L16,34');
        expect(group1.selectAll('path.stack').attr('d')).toEqual('M1,6L5,14L9,22L13,28L16,34L16,0L13,0L9,0L5,0L1,0Z');
        var group2 = wrapper.selectAll('g.group:nth-child(2)');
        expect(group2.selectAll('path.line').attr('d')).toEqual('M1,10L5,26L9,42L12,54L15,66');
        expect(group2.selectAll('path.stack').attr('d')).toEqual('M1,10L5,26L9,42L12,54L15,66L15,34L12,28L9,22L5,14L1,6Z');
      });

      it("renders multiple paths when there are gaps in the data", function() {
        collection.at(0).get('values').at(2).set('b', null);
        collection.at(1).get('values').at(2).set('b', null);
        view.graph.layers = stack(collection.models.slice().reverse());
        view.render();
        var group1 = wrapper.selectAll('g.group:nth-child(1)');
        expect(group1.selectAll('path.line').attr('d')).toEqual('M1,6L5,14M13,28L16,34');
        expect(group1.selectAll('path.stack').attr('d')).toEqual('M1,6L5,14L5,0L1,0ZM13,28L16,34L16,0L13,0Z');
        var group2 = wrapper.selectAll('g.group:nth-child(2)');
        expect(group2.selectAll('path.line').attr('d')).toEqual('M1,10L5,26M12,54L15,66');
        expect(group2.selectAll('path.stack').attr('d')).toEqual('M1,10L5,26L5,14L1,6ZM12,54L15,66L15,34L12,28Z');
      });

      it("ensures that elements are rendered in correct order after an element was selected", function () {
        // correct rendering order for stack is from bottom to top
        view.render();
        expect(wrapper.select('g.group:nth-child(1) path.line').attr('class')).toContain('line1');
        expect(wrapper.select('g.group:nth-child(2) path.line').attr('class')).toContain('line0');

        // selecting a group brings the line to front
        view.onChangeSelected(collection.at(1), 1, null, null);
        expect(wrapper.select('g.group:nth-child(1) path.line').attr('class')).toContain('line0');
        expect(wrapper.select('g.group:nth-child(2) path.line').attr('class')).toContain('line1');

        // on re-render, the correct order should be restored
        view.render();
        expect(wrapper.select('g.group:nth-child(1) path.line').attr('class')).toContain('line1');
        expect(wrapper.select('g.group:nth-child(2) path.line').attr('class')).toContain('line0');
      });

    });

    describe("onHover", function () {

      var collection;
      var view;
      var layers;
      var stack;
      beforeEach(function() {
        collection = new Collection([
          {
            // group 0
            values: new Collection([
              { x: 1, y: 2},
              { x: 2, y: 4},
              { x: 3, y: 6},
              { x: 4, y: 8},
              { x: 5, y: 10}
            ])
          },
          {
            // group 1
            values: new Collection([
              { x: 1, y: 3},
              { x: 2, y: 5},
              { x: 3, y: 7},
              { x: 4, y: 9},
              { x: 5, y: 11}
            ])
          }
        ]);


        stack = Stack.prototype.d3.layout.stack()
          .values(function (group) {
            return group.get('values').models;
          })
          .y(function (model, index) {
            return model.get('y');
          });
        layers = stack(collection.models.slice().reverse());

        view = new Stack({
          interactive: false,
          wrapper: wrapper,
          collection: collection,
          graph: {
            layers: layers
          },
          scales: {
            y: function (y) {
              return y;
            }
          },
          x: function (group, groupIndex, model, index) {
            return model.get('x');
          },
          y: function (group, groupIndex, model, index) {
            return model.get('y');
          },
          y0: function (group, groupIndex, model, index) {
            return model.y0;
          }
        });
        view.render();

        spyOn(collection, "selectItem");
      });

      it("selects the group the user is hovering over and the closest model in that group", function () {
        view.onHover({ x: 1, y: 2 });
        expect(collection.selectItem.mostRecentCall.args).toEqual([0, 0]);
        view.onHover({ x: 1, y: 4 });
        expect(collection.selectItem.mostRecentCall.args).toEqual([1, 0]);
      });

      it("selects the first group and the closest model in that group when the user hovers above the topmost area", function () {
        view.onHover({ x: 1, y: -200 });
        expect(collection.selectItem).toHaveBeenCalledWith(0, 0);
      });

      it("selects the last group and the closest model in that group when the user hovers below the bottommost area", function () {
        view.onHover({ x: 1, y: 200 });
        expect(collection.selectItem).toHaveBeenCalledWith(1, 0);
      });

      it("optionally toggles selection when the new item is already selected", function () {
        view.collection.selectedIndex = 0;
        view.collection.selectedItem = view.collection.at(0);
        view.collection.at(0).get('values').selectItem(2);
        view.onHover({ x: 3, y: 6, toggle: true });
        expect(collection.selectItem.mostRecentCall.args).toEqual([null, null]);
      });

      it("optionally selects all items at a given position but not the group", function () {
        view.selectGroup = false;
        view.onHover({ x: 1, y: 3 });
        expect(collection.selectItem.mostRecentCall.args).toEqual([null, 0]);
      });
    });
  });
});
