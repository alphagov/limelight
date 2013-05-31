define(['licensing/controllers/preprocessors/partial_experience_warning'],
function (preprocessor) {
  describe("whatever", function () {
    afterEach(function () {
      $('#global-browser-prompt').remove();
    });

    it ("blah", function () {
      $('body').append('<div id="global-browser-prompt"><p>Foo</p></div>');
      preprocessor();
      expect($('#global-browser-prompt').html()).toBe('<p>Your browser is unable to display some of the content on this page.</p><p>Foo</p>');
    });
  });
});
