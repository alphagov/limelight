define([
  'mockapi/licensing/totalapplications',
  'helpers/jquery.mockjax'
],
function (applicationsResponse) {
  $.mockjaxSettings.log = true;
  $.mockjaxSettings.responseTime = 300;
  $.mockjax(applicationsResponse);
});