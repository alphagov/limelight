define([
  'require',
  '../response',
  '../random',
  'lodash'
], function (require, Response, Random, _) {
  
  var LicensingResponse = Response.extend({
    
    initialize: function () {
      this.rnd = new Random(1);
    },
    
    url: /\/licensing\/?.*\?(.*group_by=authorityUrlSlug.*period=all)/,
    
    getData: function (query) {
      
      var values = _.map(this.authorities, function (name) {
        return {
          authorityUrlSlug: name.replace(' ', '-').toLowerCase(),
          _count: this.rnd(1e3, 1e4),
          authorityName: [name]
        }
      }, this);
      
      var licenceUrlSlug = query.filter_by;
      var licenceName = {
        "application-to-licence-a-street-collection": "Application to licence a street collection",
        "register-as-a-scrap-metal-dealer": "Register as a scrap metal dealer"
      }[licenceUrlSlug];
      _.each(values, function (value, key) {
        value.licenceName = [licenceName];
      });
      
      var data = {
        values: values
      };
      if (query.start_at) {
        data._start_at = query.start_at.originalValue;
      }
      if (query.end_at) {
        data._end_at = query.end_at.originalValue;
      }
      return data;
    },
    
    authorities: [
      "Aberdeen",
      "Adur",
      "Armagh",
      "Aylesbury",
      "Babergh",
      "Ballymena",
      "Ballymoney",
      "Barking",
      "Barnet",
      "Barnsley",
      "Bath",
      "Bedford",
      "Belfast",
      "Bexley",
      "Birmingham",
      "Blaby",
      "Blackburn",
      "Blackpool",
      "Bolsover",
      "Bolton",
      "Boston",
      "Bournemouth",
      "Bracknell",
      "Bradford",
      "Brent",
      "Brentwood",
      "Brighton",
      "Bristol",
      "Broadland",
      "Bromley",
      "Bromsgrove",
      "Broxbourne",
      "Broxtowe",
      "Burnley",
      "Bury",
      "Caerphilly",
      "Calderdale",
      "Cambridge",
      "Camden",
      "Cannock",
      "Canterbury",
      "Cardiff",
      "Carlisle",
      "Castlereagh",
      "Central",
      "Charnwood",
      "Chelmsford",
      "Cheltenham",
      "Cheshire",
      "Cheshire",
      "Chichester",
      "Chiltern",
      "Colchester",
      "Cornwall",
      "Corporation",
      "Cotswold",
      "Coventry",
      "Croydon",
      "Dartford",
      "Derby",
      "Derbyshire",
      "Derry",
      "Doncaster",
      "Dover",
      "Dudley",
      "Dundee",
      "Dungannon",
      "Durham",
      "Ealing",
      "East Devon",
      "East Dunbartonshire",
      "East Hampshire",
      "East Hertfordshire",
      "East Staffordshire",
      "Eastleigh",
      "Edinburgh",
      "Elmbridge",
      "Enfield",
      "Epping",
      "Epsom",
      "Erewash",
      "Exeter",
      "Falkirk",
      "Fareham",
      "Fenland",
      "Fife",
      "Forest",
      "Forest",
      "Gateshead",
      "Gedling",
      "Glasgow",
      "Gloucester",
      "Gravesham",
      "Greenwich",
      "Hackney",
      "Halton",
      "Hammersmith",
      "Harborough",
      "Haringey",
      "Harrogate",
      "Harrow",
      "Hastings",
      "Havering",
      "Herefordshire",
      "Hertsmere",
      "Hillingdon",
      "Horsham",
      "Hounslow",
      "Huntingdonshire",
      "Ipswich",
      "Islington",
      "Kensington",
      "King's",
      "Kingston",
      "Kingston-upon-Hull",
      "Kirklees",
      "Lambeth",
      "Lancaster",
      "Leeds",
      "Leicester",
      "Lewes",
      "Lewisham",
      "Lichfield",
      "Limavady",
      "Lincoln",
      "Liverpool",
      "Luton",
      "Maidstone",
      "Manchester",
      "Medway",
      "Merton",
      "Mid",
      "Midlothian",
      "Milton",
      "Monmouthshire",
      "Neath",
      "New",
      "Newcastle",
      "Newham",
      "Newport",
      "Newry",
      "Newtownabbey",
      "North",
      "North",
      "North",
      "North",
      "North",
      "North",
      "Northampton",
      "Northumberland",
      "Norwich",
      "Nottingham",
      "Nuneaton",
      "Oldham",
      "Oxford",
      "Pendle",
      "Perth",
      "Peterborough",
      "Plymouth",
      "Poole",
      "Portsmouth",
      "Powys",
      "Preston",
      "Reading",
      "Redbridge",
      "Reigate",
      "Renfrewshire",
      "Rhondda-Cynon-Taff",
      "Ribble",
      "Richmond",
      "Rochdale",
      "Rochford",
      "Rotherham",
      "Rugby",
      "Runnymede",
      "Rushcliffe",
      "Rushmoor",
      "Ryedale",
      "Salford",
      "Sandwell",
      "Scarborough",
      "Sefton",
      "Sevenoaks",
      "Sheffield",
      "Shropshire",
      "Slough",
      "South Bucks",
      "South Cambridgeshire",
      "South Gloucestershire",
      "South Hams",
      "South Kesteven",
      "South Lakeland",
      "South Lanarkshire",
      "South Northamptonshire",
      "South Oxfordshire",
      "South Ribble",
      "South Somerset",
      "South Staffordshire",
      "South Tyneside",
      "Southampton",
      "Southwark",
      "Spelthorne",
      "St Albans",
      "St Edmundsbury",
      "St Helens",
      "Stockport",
      "Stoke-on-Trent",
      "Strabane",
      "Stratford",
      "Suffolk",
      "Surrey",
      "Sutton",
      "Swale",
      "Swansea",
      "Tameside",
      "Taunton",
      "Teignbridge",
      "Tewkesbury",
      "Thanet",
      "Three",
      "Thurrock",
      "Tonbridge",
      "Torbay",
      "Tower",
      "Tunbridge",
      "Uttlesford",
      "Vale",
      "Wakefield",
      "Walsall",
      "Waltham",
      "Wandsworth",
      "Warrington",
      "Warwick",
      "Watford",
      "Waverley",
      "West Berkshire",
      "West Dorset",
      "West Lancashire",
      "West Lothian",
      "West Oxfordshire",
      "Westminster",
      "Wigan",
      "Wiltshire",
      "Winchester",
      "Windsor",
      "Wokingham",
      "Wolverhampton",
      "Worcester",
      "Worthing",
      "Wychavon",
      "Wycombe",
      "Wyre",
      "Wyre Forest",
      "York"
    ]
  });
  
  return LicensingResponse;
});
