#Limelight

##What is it

Limelight is the app serving the 'new' frontend of the performance platform. (The GOV.UK dashboard is still served from
https://github.com/alphagov/datainsight-frontend). It gets data from the backdrop api (https://github.com/alphagov/backdrop) and 
converts it into dashboards and visualisations using backbone and d3.js.

##Starting Limelight with stub data

To run limelight using stubbed data instead of the backend, set the environment variable `USE_STUB_API` to `true` when you run the application.

Using `bowler`:

```Shell
USE_STUB_API=true bowl limelight
```

Using `rails`:

```Shell
USE_STUB_API=true rails s
```

If you use the latter you will need to set up [slimmer](https://github.com/alphagov/slimmer) yourself.

## Running tests

**All tests:**

    bundle exec rake test:all

**Selenium on your machine:**

[Download Selenium Server](http://docs.seleniumhq.org/download/) (2.33.0
seems to work nicely) and run it with `java -jar selenium-server-standalone-2.33.0.jar`

Run the tests (other browsers are available, you may need drivers, etc):

    BROWSER_NAME=firefox DRIVER_HOST=10.0.2.2 bundle exec cucumber -p selenium
