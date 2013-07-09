define([
  'lpa/collections/application-method-over-time'
],
function (ApplicationMethod) {

  describe("Application method over time", function() {
    it("groups data into digital and non-digital", function() {
      exampleJson = {
        "data": [
          {
            "start_at": "2013-01-01", 
            "value": "631", 
            "end_at": "2013-01-08", 
            "key": "property_and_financial_paper_applications", 
          },
          {
            "start_at": "2013-01-01", 
            "value": "247", 
            "end_at": "2013-01-08", 
            "key": "health_and_welfare_paper_applications", 
          },
          {
            "start_at": "2013-01-01", 
            "value": "28", 
            "end_at": "2013-01-08", 
            "key": "property_and_financial_digital_applications", 
          },
          {
            "start_at": "2013-01-01", 
            "value": "94", 
            "end_at": "2013-01-08", 
            "key": "health_and_welfare_digital_applications", 
          },
          {
            "start_at": "2013-01-01", 
            "value": "77", 
            "end_at": "2013-01-08", 
            "key": "property_and_financial_digital_applications_perfect", 
          }
        ]
      };

      var expected = [
        {
          "id": "digital",
          "title": "Digital applications",
          "values": [{
            "_start_at": "2013-01-01T00:00:00+00:00",
            "_end_at": "2013-01-08T00:00:00+00:00",
            "_count": 122,
            "fraction": 0.122
          }]
        },
        {
          "id": "non_digital",
          "title": "Non-digital applications",
          "values": [{
            "_start_at": "2013-01-01T00:00:00+00:00",
            "_end_at": "2013-01-08T00:00:00+00:00",
            "_count": 878,
            "fraction": 0.878
          }]
        }
      ];

      expect(ApplicationMethod.prototype.parse(exampleJson)).toEqual(expected);

    });
  });

});
