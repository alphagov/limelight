define([
  'extensions/views/availability/uptime-graph',
  'extensions/collections/collection'
],
  function (Graph, Collection) {

    describe("configuration", function () {

      it("returns configuration for hour, an query is for hour", function () {
        var view = new Graph({
          collection: new Collection()
        });

        expect(view.getConfigNames()).toEqual(['stack', 'hour']);
      });

    });
  });
