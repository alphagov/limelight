#Limelight

##What is it

Limelight is the app serving the 'new' frontend of the performance platform. (The GOV.UK dashboard is still served from
https://github.com/alphagov/datainsight-frontend). It gets data from the backdrop api (https://github.com/alphagov/backdrop) and 
converts it into dashboards and visualisations using backbone and d3.js.

##Starting Limelight with stub data

Set these two environment variables: `USE_API_STUB=TRUE BACKDROP_URL=//fakeapi`. 
Start limelight using `bowl limelight` or `rails s`.
If you use the latter you will need to set up [slimmer](https://github.com/alphagov/slimmer) yourself.
