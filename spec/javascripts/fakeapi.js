define([
  'jquerymockjax',
  'fakeapi/licensing/perlicencetable',
  'fakeapi/licensing/perlicencegraph',
  'fakeapi/licensing/total'
],
function () {
  // use XMLHttpRequest for cross domain mock calls on IE
  // as mockjax does not replace XDomainRequest
  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.crossDomain = false;
  });
  
  $.mockjaxSettings.log = true;
  $.mockjaxSettings.responseTime = 300;
  
  var responses = Array.prototype.slice.call(arguments, 1);
  for (var i = 0, ni = responses.length; i < ni; i++) {
    var response = new responses[i]()
    $.mockjax(response.getDefinition());
  };
});