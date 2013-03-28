define([
  'licensing/collections/totalandbyauthority',
  'licensing/collections/applications',
  'licensing/collections/byauthority',
  'extensions/collection'
],
function (TotalAndByAuthority, Total, ByAuthority, Collection) {
  describe("ApplicationsTotalAndByAuthorityCollection", function() {
    
    describe("parse", function() {
      
      var totalAndByAuthority, moment;
      beforeEach(function() {
        totalAndByAuthority = new TotalAndByAuthority();
        moment = totalAndByAuthority.moment;
        var total = totalAndByAuthority.collectionInstances[0];
        var byAuthority = totalAndByAuthority.collectionInstances[1];
        total.reset(total.parse({ data: [
          {
            _start_at: moment('2013-02-18T00:00:00+00:00'),
            _end_at: moment('2013-02-25T00:00:00+00:00'),
            _count: 90
          },
          {
            _start_at: moment('2013-02-25T00:00:00+00:00'),
            _end_at: moment('2013-03-04T00:00:00+00:00'),
            _count: 100
          },
          {
            _start_at: moment('2013-03-04T00:00:00+00:00'),
            _end_at: moment('2013-03-11T00:00:00+00:00'),
            _count: 110
          }
        ]}));
        
        byAuthority.reset(byAuthority.parse({data: [
          {
            values: [
              {
                _end_at: moment('2013-02-25T00:00:00+00:00'),
                _count: 1,
                _start_at: moment('2013-02-18T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-04T00:00:00+00:00'),
                _count: 6,
                _start_at: moment('2013-02-25T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-11T00:00:00+00:00'),
                _count: 11,
                _start_at: moment('2013-03-04T00:00:00+00:00')
              }
            ],
            authorityUrlSlug: "westminster",
            authorityName: ['Westminster'],
            licenceName: ['Temporary events notice'],
            _group_count: 3
          },
          {
            values: [
              {
                _end_at: moment('2013-02-25T00:00:00+00:00'),
                _count: 2,
                _start_at: moment('2013-02-18T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-04T00:00:00+00:00'),
                _count: 7,
                _start_at: moment('2013-02-25T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-11T00:00:00+00:00'),
                _count: 12,
                _start_at: moment('2013-03-04T00:00:00+00:00')
              }
            ],
            authorityUrlSlug: "croydon",
            authorityName: ['Croydon'],
            licenceName: ['Temporary events notice'],
            _group_count: 3
          },
          {
            values: [
              {
                _end_at: moment('2013-02-25T00:00:00+00:00'),
                _count: 3,
                _start_at: moment('2013-02-18T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-04T00:00:00+00:00'),
                _count: 8,
                _start_at: moment('2013-02-25T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-11T00:00:00+00:00'),
                _count: 13,
                _start_at: moment('2013-03-04T00:00:00+00:00')
              }
            ],
            authorityUrlSlug: "wandsworth",
            authorityName: ['Wandsworth'],
            licenceName: ['Temporary events notice'],
            _group_count: 3
          },
          {
            values: [
              {
                _end_at: moment('2013-02-25T00:00:00+00:00'),
                _count: 4,
                _start_at: moment('2013-02-18T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-04T00:00:00+00:00'),
                _count: 9,
                _start_at: moment('2013-02-25T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-11T00:00:00+00:00'),
                _count: 14,
                _start_at: moment('2013-03-04T00:00:00+00:00')
              }
            ],
            authorityUrlSlug: "lambeth",
            authorityName: ['Lambeth'],
            licenceName: ['Temporary events notice'],
            _group_count: 3
          },
          {
            values: [
              {
                _end_at: moment('2013-02-25T00:00:00+00:00'),
                _count: 5,
                _start_at: moment('2013-02-18T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-04T00:00:00+00:00'),
                _count: 10,
                _start_at: moment('2013-02-25T00:00:00+00:00')
              },
              {
                _end_at: moment('2013-03-11T00:00:00+00:00'),
                _count: 15,
                _start_at: moment('2013-03-04T00:00:00+00:00')
              }
            ],
            authorityUrlSlug: "bristol",
            authorityName: ['Bristol'],
            licenceName: ['Temporary events notice'],
            _group_count: 3
          }
        ]}));
      });
      
      it("combines both data sources with additional data when available", function() {
        totalAndByAuthority.reset(totalAndByAuthority.parse(), { parse: true });
        
        expect(totalAndByAuthority.length).toEqual(6);
        var total = totalAndByAuthority.at(0);
        expect(total.get('id')).toEqual('total');
        expect(total.get('title')).toEqual('Total applications');
        expect(total.get('values').at(0).get('_start_at').format('YYYY-MM-DD')).toEqual('2013-02-18');
        expect(total.get('values').at(0).get('_end_at').format('YYYY-MM-DD')).toEqual('2013-02-25');
        expect(total.get('values').at(0).get('_count')).toEqual(90);
        expect(total.get('values').at(2).get('_start_at').format('YYYY-MM-DD')).toEqual('2013-03-04');
        expect(total.get('values').at(2).get('_end_at').format('YYYY-MM-DD')).toEqual('2013-03-11');
        expect(total.get('values').at(2).get('_count')).toEqual(110);
        
        var westminster = totalAndByAuthority.at(1);
        expect(westminster.get('id')).toEqual('westminster');
        expect(westminster.get('title')).toEqual('Westminster');
        expect(westminster.get('subTitle')).toEqual('Temporary events notice');
        expect(westminster.get('values').at(0).get('_start_at').format('YYYY-MM-DD')).toEqual('2013-02-18');
        expect(westminster.get('values').at(0).get('_end_at').format('YYYY-MM-DD')).toEqual('2013-02-25');
        expect(westminster.get('values').at(0).get('_count')).toEqual(1);
        expect(totalAndByAuthority.at(5).get('id')).toEqual('bristol');
        expect(totalAndByAuthority.at(5).get('title')).toEqual('Bristol');
        expect(totalAndByAuthority.at(5).get('subTitle')).toEqual('Temporary events notice');
      });
      
      it("combines both data sources with fallback data", function() {
        totalAndByAuthority.collectionInstances[1].each(function (group) {
          group.set('authorityName', null);
          group.set('licenceName', null);
        });
        totalAndByAuthority.reset(totalAndByAuthority.parse(), { parse: true });
        
        expect(totalAndByAuthority.length).toEqual(6);
        var total = totalAndByAuthority.at(0);
        expect(total.get('id')).toEqual('total');
        expect(total.get('title')).toEqual('Total applications');
        expect(total.get('values').at(0).get('_start_at').format('YYYY-MM-DD')).toEqual('2013-02-18');
        expect(total.get('values').at(0).get('_end_at').format('YYYY-MM-DD')).toEqual('2013-02-25');
        expect(total.get('values').at(0).get('_count')).toEqual(90);
        expect(total.get('values').at(2).get('_start_at').format('YYYY-MM-DD')).toEqual('2013-03-04');
        expect(total.get('values').at(2).get('_end_at').format('YYYY-MM-DD')).toEqual('2013-03-11');
        expect(total.get('values').at(2).get('_count')).toEqual(110);
        expect(totalAndByAuthority.at(0).get('id')).toEqual('total');
        expect(totalAndByAuthority.at(0).get('title')).toEqual('Total applications');
        expect(totalAndByAuthority.at(0).get('subTitle')).toBeFalsy();
        expect(totalAndByAuthority.at(1).get('id')).toEqual('westminster');
        expect(totalAndByAuthority.at(1).get('title')).toEqual('westminster');
        expect(totalAndByAuthority.at(0).get('subTitle')).toBeFalsy();
        expect(totalAndByAuthority.at(5).get('id')).toEqual('bristol');
        expect(totalAndByAuthority.at(5).get('title')).toEqual('bristol');
        expect(totalAndByAuthority.at(0).get('subTitle')).toBeFalsy();
      });
    });
  });
});
