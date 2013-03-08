define(function () {

  var response = {
    "data": [
        {
            "_start_at": "2012-12-03T00:00:00+00:00",
            "_end_at": "2012-12-10T00:00:00+00:00",
            "authority": {
                "Westminster": {
                    "count": 3
                },
                "Camden": {
                    "count": 1
                }
            }
        }
    ]
  };

  return {
    url: /\/licensing\/\?/,
    dataType: 'json',
    response: function(settings) {
      this.responseText = response;
    }
  };
});
