define([
  'fakeapi/licensing/totalapplications',
  'helpers/jquery.mockjax'
],
function (applicationsResponse) {
  
  if ($('#wrapper').data('backdrop-url').indexOf('//fakeapi') == -1) {
    // use real API
    return;
  }
  
  $.mockjaxSettings.log = true;
  $.mockjaxSettings.responseTime = 300;
  $.mockjax(applicationsResponse);
});