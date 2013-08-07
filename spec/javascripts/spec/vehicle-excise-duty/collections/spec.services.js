define([
  'vehicle-excise-duty/collections/services'
],
function (Services) {
  describe("Vehicle Excise Duty Services Collection", function () {
    describe("parse", function () {
      it("parses response into two separate series", function () {
        var response = {
          "data": [
            {
              "_count": 2, 
              "values": [
                {
                  "_end_at": "2013-08-05T00:00:00+00:00", 
                  "_count": 2, 
                  "_start_at": "2013-07-29T00:00:00+00:00"
                }
              ], 
              "successful_tax_disc:sum": 151065,
              "successful_sorn:sum": 16718
            },
            {
              "_count": 2,
              "values": [
                {
                  "_end_at": "2013-07-29T00:00:00+00:00",
                  "_count": 2,
                  "_start_at": "2013-07-22T00:00:00+00:00"
                }
              ],
              "successful_tax_disc:sum": 121065,
              "successful_sorn:sum": 26718
            }
          ]
        };

        var services = new Services(response, { parse: true });
        expect(services.length).toEqual(2);
        expect(services.at(0).get('id')).toEqual('successful_sorn');
        expect(services.at(0).get('title')).toEqual('SORN');
        expect(services.at(0).get('values').length).toEqual(2);
        expect(services.at(0).get('values').at(0).get('_start_at').utc().format()).toEqual('2013-07-22T00:00:00+00:00');
        expect(services.at(0).get('values').at(0).get('_end_at').utc().format()).toEqual('2013-07-29T00:00:00+00:00');
        expect(services.at(0).get('values').at(0).get('_count')).toEqual(26718);
        expect(services.at(0).get('values').at(1).get('_count')).toEqual(16718);
        expect(services.at(1).get('id')).toEqual('successful_tax_disc');
        expect(services.at(1).get('title')).toEqual('Tax-disc');
        expect(services.at(1).get('values').length).toEqual(2);
      });
    });
  });
});