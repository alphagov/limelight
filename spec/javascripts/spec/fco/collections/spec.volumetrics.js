define(['fco/collections/volumetrics'],
  function (VolumetricsCollection) {
    var someFakeFCOTransactionData = { data: [
      {
        _timestamp: "2013-06-09T23:00:00+00:00",
        eventCategory: "fco-transaction-name:start",
        uniqueEvents: 5
      },
      {
        _timestamp: "2013-06-16T23:00:00+00:00",
        eventCategory: "fco-transaction-name:start",
        uniqueEvents: 7
      },
      {
        _timestamp: "2013-06-23T23:00:00+00:00",
        eventCategory: "fco-transaction-name:start",
        uniqueEvents: 9
      },
      {
        _timestamp: "2013-06-09T23:00:00+00:00",
        eventCategory: "fco-transaction-name:done",
        uniqueEvents: 3
      },
      {
        _timestamp: "2013-06-16T23:00:00+00:00",
        eventCategory: "fco-transaction-name:done",
        uniqueEvents: 3
      },
      {
        _timestamp: "2013-06-23T23:00:00+00:00",
        eventCategory: "fco-transaction-name:done",
        uniqueEvents: 4
      }
    ]};

    describe("FCO volumetrics collections", function () {
      var volumetricsCollection = undefined;

      beforeEach(function () {
        volumetricsCollection = new VolumetricsCollection(someFakeFCOTransactionData, {
          serviceName: 'notARealFCOTransaction'
        });
      });

      it("should query backdrop for journey data for the specified service", function () {
        expect(volumetricsCollection.url()).toContain("journey");
        expect(volumetricsCollection.url()).toContain("notARealFCOTransaction");
      });

      it("should count the total number of people starting the transaction", function () {
        expect(volumetricsCollection.numberOfJourneyStarts(someFakeFCOTransactionData)).toEqual(21);
      });

      it("should count the total number of people completing the transaction", function () {
        expect(volumetricsCollection.numberOfJourneyCompletions(someFakeFCOTransactionData)).toEqual(10);
      });

      it("should give the total completion rate as a percentage", function () {
        expect(volumetricsCollection.completionRate(someFakeFCOTransactionData)).toBeCloseTo(47.6, 0.01);
      });

      it("should give a series for applications", function () {
        var applicationsSeries = volumetricsCollection.applicationsSeries();
        expect(applicationsSeries.title).toBe("Done");
        expect(applicationsSeries.id).toBe("done");
        expect(applicationsSeries.values).not.toBeUndefined();
      });

      it("should give a series for completion rate", function () {
        var completionSeries = volumetricsCollection.completionSeries();
        expect(completionSeries.title).toBe("Completion rate");
        expect(completionSeries.id).toBe("completion");
        expect(completionSeries.totalCompletion).toBeCloseTo(47.6, 0.01);
        expect(completionSeries.values.length).not.toBeUndefined();
      });
      
      it("should map applications to application series", function () {
        var firstValue = volumetricsCollection.applicationsSeries().values[6];
        expect(firstValue._start_at).toBeMoment(moment("2013-06-10T01:00:00+01:00"));
        expect(firstValue._end_at).toBeMoment(moment("2013-06-17T01:00:00+01:00"));
        expect(firstValue.uniqueEvents).toBe(3);
        var secondValue = volumetricsCollection.applicationsSeries().values[7];
        expect(secondValue._start_at).toBeMoment(moment("2013-06-17T01:00:00+01:00"));
        expect(secondValue._end_at).toBeMoment(moment("2013-06-24T01:00:00+01:00"));
        expect(secondValue.uniqueEvents).toBe(3);
        var thirdValue = volumetricsCollection.applicationsSeries().values[8];
        expect(thirdValue._start_at).toBeMoment(moment("2013-06-24T01:00:00+01:00"));
        expect(thirdValue._end_at).toBeMoment(moment("2013-07-01T01:00:00+01:00"));
        expect(thirdValue.uniqueEvents).toBe(4);
      });

      it("should map completion rates to completion series", function () {
        var firstValue = volumetricsCollection.completionSeries().values[0];
        expect(firstValue._start_at).toBeMoment(moment("2013-06-10T01:00:00+01:00"));
        expect(firstValue._end_at).toBeMoment(moment("2013-06-17T01:00:00+01:00"));
        expect(firstValue.completion).toBe(60);
        var secondValue = volumetricsCollection.completionSeries().values[1];
        expect(secondValue._start_at).toBeMoment(moment("2013-06-17T01:00:00+01:00"));
        expect(secondValue._end_at).toBeMoment(moment("2013-06-24T01:00:00+01:00"));
        expect(secondValue.completion).toBeCloseTo(42.8, 0.1);
        var thirdValue = volumetricsCollection.completionSeries().values[2];
        expect(thirdValue._start_at).toBeMoment(moment("2013-06-24T01:00:00+01:00"));
        expect(thirdValue._end_at).toBeMoment(moment("2013-07-01T01:00:00+01:00"));
        expect(thirdValue.completion).toBeCloseTo(44.44, 0.1);
      });
      
      it("should query for 9 weeks of data for application series", function () {
        expect(volumetricsCollection.applicationsSeries().values.length).toBe(9);
      });

      it("should pad out missing data for application series", function () {
        var paddedValues = volumetricsCollection.applicationsSeries().values.splice(0,6);
        var paddedValue = paddedValues.pop();
        expect(paddedValue._start_at).toBeMoment(moment("2013-06-03T01:00:00+01:00"));
        expect(paddedValue._end_at).toBeMoment(moment("2013-06-10T01:00:00+01:00"));
        expect(paddedValue.uniqueEvents).toBe(0);

        var paddedValue2 = paddedValues.pop();
        expect(paddedValue2._start_at).toBeMoment(moment("2013-05-27T01:00:00+01:00"));
        expect(paddedValue2._end_at).toBeMoment(moment("2013-06-03T01:00:00+01:00"));
        expect(paddedValue2.uniqueEvents).toBe(0);
      });
    });
  }
);
