define([
  'extensions/views/graph/bar',
  'extensions/collections/collection'
],
  function (Bar, Collection) {
    describe("bar component", function () {
      
      describe("render", function () {
        var d3 = Bar.prototype.d3;

        var el, wrapper, collection;
        beforeEach(function () {
          el = $('<div></div>').appendTo($('body'));
          wrapper = d3.select(el[0]).append('svg').append('g');
          collection = new Collection([
            {
              testAttr:'b',
              values: new Collection([
                { a:1, b:2, name: "one"},
                { a:4, b:5, name: "two"},
                { a:7, b:8, name: "three"}
              ])
            },
            {
              testAttr:'c',
              values: new Collection([
                { a:11, b:12, name: "four"},
                { a:14, b:15, name: "five"},
                { a:17, b:18, name: "six"}
              ])
            }
          ]);
        });

        afterEach(function () {
          el.remove();
        });

        it("renders a center-aligned segments for each model in each series", function () {

          var view = new Bar({
            wrapper:wrapper,
            collection:collection,
            x: function (model, i) {
              return this.scales.x(model.get('a'));
            },
            yStack: function (model, i) {
              return model.get('b');
            },
            barWidth: function(model, i) {
              return 10;
            },
            text: function(model, i) {
              return model.get('name')
            },
            scales:{
              x: function (v) {
                return v * 2;
              },
              y: function (v) {
                return -v * 2;
              }
            }
          });
          view.render();

          var segments = view.componentWrapper.selectAll('g.segment');

          expect(segments[0].length).toEqual(6);
          segments.each(function () {
            expect(d3.select(this).selectAll('rect')[0].length).toEqual(1);
            expect(d3.select(this).selectAll('line')[0].length).toEqual(1);
            expect(d3.select(this).selectAll('text')[0].length).toEqual(1);
          });

          expect(d3.select('g.segment:nth-child(1) rect').attr('x')).toEqual('-3');
          expect(d3.select('g.segment:nth-child(1) rect').attr('y')).toEqual('-4');
          expect(d3.select('g.segment:nth-child(1) line').attr('y1')).toEqual('-4');
          expect(d3.select('g.segment:nth-child(1) line').attr('y2')).toEqual('-4');
          expect(d3.select('g.segment:nth-child(1) text').attr('x')).toEqual('2');
          expect(d3.select('g.segment:nth-child(1) text').attr('y')).toEqual('-4');

          expect(d3.select('g.segment:nth-child(2) rect').attr('x')).toEqual('3');
          expect(d3.select('g.segment:nth-child(2) rect').attr('y')).toEqual('-10');
          expect(d3.select('g.segment:nth-child(2) line').attr('y1')).toEqual('-10');
          expect(d3.select('g.segment:nth-child(2) line').attr('y2')).toEqual('-10');
          expect(d3.select('g.segment:nth-child(2) text').attr('x')).toEqual('8');
          expect(d3.select('g.segment:nth-child(2) text').attr('y')).toEqual('-10');

          expect(d3.select('g.segment:nth-child(3) rect').attr('x')).toEqual('9');
          expect(d3.select('g.segment:nth-child(3) rect').attr('y')).toEqual('-16');
          expect(d3.select('g.segment:nth-child(3) line').attr('y1')).toEqual('-16');
          expect(d3.select('g.segment:nth-child(3) line').attr('y2')).toEqual('-16');
          expect(d3.select('g.segment:nth-child(3) text').attr('x')).toEqual('14');
          expect(d3.select('g.segment:nth-child(3) text').attr('y')).toEqual('-16');
        });

      });
    });
  });