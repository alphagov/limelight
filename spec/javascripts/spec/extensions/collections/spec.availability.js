define([
  'extensions/collections/availability',
  'lodash'
],
  function (Availability, _) {
    describe('Availability', function () {
      var availabilityData = {"data":[
        {
          "uptime:sum": 9,
          "downtime:sum": 1,
          "unmonitored:sum": 1,
          "avgresponse:mean": 321
        },
        {
          "uptime:sum": 10,
          "downtime:sum": 0,
          "unmonitored:sum": 1,
          "avgresponse:mean": 345
        }
      ]};

      var options = {
        checkName: "anything",
        serviceName: "anything",
        parse: true
      };

      it("should use the specified service name in the url", function () {
        var collection =
          new Availability(null, {
            checkName: "anything",
            serviceName: "something-something-fco"
          });

        var url = collection.url();

        expect(url).toContain('/something-something-fco/')
      });

      it("should be created with correct query parameters", function () {
        var collection =
          new Availability(null, {
            checkName: "mycheck",
            serviceName: "anything"
          });
        var params = collection.queryParams();
        expect(params.period).toEqual("hour");
        expect(params.collect).toEqual(["downtime:sum", "uptime:sum", "unmonitored:sum", "avgresponse:mean"]);
      });

      it("should provide percentage of uptime for all models", function () {
        var collection =
          new Availability(availabilityData, options);

          var fractionOfUptime = collection.getFractionOfUptime();

          expect(fractionOfUptime).toEqual(0.95);
      });

      it("should provide total uptime", function () {

        var collection =
          new Availability(availabilityData, options);

        var totalUptime = collection._getTotalUptime();

        expect(totalUptime).toEqual(19);
      });

      it("should provide total (monitored) time", function () {
        var collection =
          new Availability({"data": [{
            "uptime:sum": 1,
            "downtime:sum": 2,
            "unmonitored:sum": 3
          }]}, options);

        var totalTime = collection._getTotalTime();

        expect(totalTime).toEqual(3);
      });
      
      it("should provide total monitored AND unmonitored time", function () {
        var collection =
          new Availability({"data": [{
            "uptime:sum": 1,
            "downtime:sum": 2,
            "unmonitored:sum": 3
          }]}, options);

        var totalTime = collection._getTotalTime(true);

        expect(totalTime).toEqual(6);
      });

      it("should provide total time for all models", function () {
        var collection =
          new Availability(availabilityData, options);

        var totalTime = collection._getTotalTime();

        expect(totalTime).toEqual(20);
      });

      it("should provide average response time", function () {
        var collection =
          new Availability(availabilityData, options);

        var averageResponseTime = collection.getAverageResponseTime();

        expect(averageResponseTime).toEqual(333);
      });

      it("should throw an exception if created with no serviceName", function() {
        expect(function() {
          new Availability([], { checkName: "anything" });
        }).toThrow()
      });

      it("should parse data with end_at as the timestamp and start at as an hour earlier", function() {
         response = {
           data: [
             {
               "uptime:sum": 900, "downtime:sum": 100,
               "unmonitored:sum": 0,
               "avgresponse:mean": 100,
               "_end_at":"2013-06-17T16:00:00+00:00",
               "_start_at":"2013-06-17T15:00:00+00:00"
             }
           ]
         }
         var collection =
           new Availability(availabilityData, options);

         data = collection.parse(response);

         expect(data.values[0]._start_at).toEqual(moment("2013-06-17T15:00:00+00:00"));
         expect(data.values[0]._end_at).toEqual(moment("2013-06-17T16:00:00+00:00"));
      });
    });
  });
