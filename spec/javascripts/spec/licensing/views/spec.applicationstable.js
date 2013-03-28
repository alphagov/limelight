define([
  'licensing/views/applicationstable',
  'extensions/collection'
],
function (Table, Collection) {
  describe("Licence Applications Table", function () {
    describe("render", function () {
      
      var el, collection, table;
      beforeEach(function() {
        el = $('<div id="jasmine-playground"></div>').appendTo($('body'));
      });

      afterEach(function() {
        el.remove();
      });

      it("displays concatenation of licence name and authority name when available", function () {
        collection = new Collection([
          { authorityName: 'Authority 1', licenceName: 'Licence 1' },
          { authorityName: 'Authority 2', licenceName: 'Licence 2' },
          { authorityName: 'Authority 3', licenceName: 'Licence 3' }
        ]);
        
        table = new Table({
          el: el,
          collection: collection
        });
        table.render();
        
        expect(el.find('.body tr:eq(0) td:eq(0)').text()).toEqual('Licence 1 – Authority 1');
        expect(el.find('.body tr:eq(1) td:eq(0)').text()).toEqual('Licence 2 – Authority 2');
        expect(el.find('.body tr:eq(2) td:eq(0)').text()).toEqual('Licence 3 – Authority 3');
      });
      
      it("displays concatenation authority name only when licence name is not available", function () {
        collection = new Collection([
          { authorityName: 'Authority 1' },
          { authorityName: 'Authority 2', licenceName: 'Licence 2' },
          { authorityName: 'Authority 3' }
        ]);
        
        table = new Table({
          el: el,
          collection: collection
        });
        table.render();
        
        expect(el.find('.body tr:eq(0) td:eq(0)').text()).toEqual('Authority 1');
        expect(el.find('.body tr:eq(1) td:eq(0)').text()).toEqual('Licence 2 – Authority 2');
        expect(el.find('.body tr:eq(2) td:eq(0)').text()).toEqual('Authority 3');
      });
    });
  });
});
