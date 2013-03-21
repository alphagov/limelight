define([
  'fakeapi/licensing/totalapplications',
  'jquerymockjax'
],
function (applicationsResponse) {
  
  var backdropUrl = $('#wrapper').data('backdrop-url');
  if (!window.jasmine && backdropUrl && backdropUrl.indexOf('//fakeapi') == -1) {
    // use real API
    return;
  }
  
  // use XMLHttpRequest for cross domain mock calls on IE
  // as mockjax does not replace XDomainRequest
  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.crossDomain = false;
  });
  
  $.mockjaxSettings.log = true;
  $.mockjaxSettings.responseTime = 300;
  $.mockjax(applicationsResponse);
});