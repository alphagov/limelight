define([
  'common/controllers/availability-module',
], function (availabilityModule) {
  return function () {

    var serviceName = $("#wrapper").data("service-name");

    availabilityModule(serviceName);
    availabilityModule(serviceName, '#sorn-availability');
  };
});