define([
  'mockapi/licensing/applications',
  'helpers/jquery.mockjax'
],
function (applicationsResponse) {
  $.mockjaxSettings.log = false;
  $.mockjaxSettings.responseTime = 300;
  $.mockjax(applicationsResponse);
});