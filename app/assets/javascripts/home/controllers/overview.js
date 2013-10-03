// define([],
// function () {
//   return function () {
//     console.log("dasdas");
//     $("a[href='/performance/services']").removeClass("active");
    

//   }
// });

define([
  'hmrc/collections/contact-method-over-time',
  'extensions/views/timeseries-graph/multi-timeseries-graph'
],
function (ContactCollection, ApplicationsGraph) {
  return function () {
    $("a[href='/performance/services']").removeClass("active");

    // if (!$('.lte-ie8').length && $('#application-method-over-time').length) {
    //   var contactCollection = new ContactCollection();

    //   var graphView = new ApplicationsGraph({
    //     el: $('#application-method-over-time'),
    //     collection: contactCollection
    //   });

    //   contactCollection.fetch();
    // }

  }
});