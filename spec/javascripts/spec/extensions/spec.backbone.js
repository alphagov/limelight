define([
  'backbone'
],
function (Backbone) {
  describe("sync", function () {
    it("escapes HTML characters in received response", function () {
      $.mockjax({
        url: '//testurl',
        contentType: 'application/json',
        responseText: '{"someProperty": "<b>html content</b>"}'
      });

      var response = null;

      runs(function() {
        Backbone.sync('get', new Backbone.Model(), {
          url: '//testurl',
          success: function(resp) { response = resp; }
        })
      });

      waitsFor(function() {
        return response !== null;
      }, "the collection should fetch the mocked response", 2000);

      runs(function() {
        expect(response.someProperty).toBe("&lt;b&gt;html content&lt;/b&gt;")
      });
    });
  });

  describe("escapeHtml", function() {
    it("should escape html markup in string properties", function() {
      var obj = {
        prop: "<p>tags && ampersands</p>"
      };
      var escaped = Backbone.escapeHtml(obj);

      expect(escaped).toEqual( {prop: "&lt;p&gt;tags &amp;&amp; ampersands&lt;/p&gt;" } );
    });

    it("should escape string in nested objects", function() {
      var obj = {
        data: [
          { prop: "<script>alert('surprise');</script>" },
          { prop: "blah" }
        ]
      };

      var escaped = Backbone.escapeHtml(obj);

      expect(escaped.data[0].prop).toEqual( "&lt;script&gt;alert('surprise');&lt;/script&gt;" );
    });

    it("should escape strings in arrays", function() {
      var obj = {
        data: [
          "a string",
          "<script>alert('surprise');</script>"
        ]
      };

      var escaped = Backbone.escapeHtml(obj);

      expect(escaped.data[1]).toEqual( "&lt;script&gt;alert('surprise');&lt;/script&gt;" );
    });
  });
});
