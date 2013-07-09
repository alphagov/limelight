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
            "value": "753", 
            "end_at": "2013-01-08", 
            "key": "property_and_financial_paper_applications", 
          },
          {
            "start_at": "2013-01-01", 
            "value": "218", 
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
          "title": "Digital",
          "values": [{
            "_start_at": "2013-01-01T00:00:00+00:00",
            "_end_at": "2013-01-08T00:00:00+00:00",
            "_count": 122
          }]
        },
        {
          "id": "non_digital",
          "title": "Non-digital",
          "values": [{
            "_start_at": "2013-01-01T00:00:00+00:00",
            "_end_at": "2013-01-08T00:00:00+00:00",
            "_count": 971          
          }]
        }
      ];

      expect(ApplicationMethod.prototype.parse(exampleJson)).toEqual(expected);

    });
  });

});
