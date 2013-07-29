define([
  'extensions/views/availability/tooltip',
  'extensions/models/model'
],
function (Tooltip, Model) {

  describe("Tooltip", function () {

    describe("onChangeSelected", function () {
      var el, tooltip, wrapper, model;
      beforeEach(function () {
        el = $('<div></div>').appendTo($('body'));
        wrapper = Tooltip.prototype.d3.select(el[0]).append('svg').append('g');

        tooltip = new Tooltip({
          el: el,
          wrapper: wrapper,
          collection: { on: jasmine.createSpy() },
          graph: {
            valueAttr: "modelValue"
          },
          x: function (model, index) {
            return 10;
          },
          y: function (model, index) {
            return 20;
          }
        });

        model = new Model({
          modelValue: "Tooltip Text"
        });
      });

      afterEach(function () {
        el.remove();
      });

      it("renders a tooltip at the position with offsets", function () {
        tooltip.render();
        tooltip.onChangeSelected(null, null, model, 1);

        expect(wrapper.select('text.tooltip-text').text()).toEqual("Tooltip Text");
        expect(wrapper.select('text.tooltip-text').attr('transform')).toEqual("translate(17, 27)");
      });

      it("hides the tooltip when unselected", function () {
        tooltip.render();

        tooltip.onChangeSelected(null, null, model, 1);
        expect(wrapper.select('text.tooltip-text')[0][0]).not.toBeFalsy();

        tooltip.onChangeSelected(null, null, null, null);
        expect(wrapper.select('text.tooltip-text')[0][0]).toBeFalsy();
      });

    });

  });

});