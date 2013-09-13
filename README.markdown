# Limelight

## What is it

Limelight is the app serving the 'new' frontend of the performance platform. (The GOV.UK dashboard is still served from
https://github.com/alphagov/datainsight-frontend). It gets data from the backdrop api (https://github.com/alphagov/backdrop) and 
converts it into dashboards and visualisations using backbone and d3.js.

## Starting Limelight serving it's own (stub) data

Files are served from the `backdrop_stub_controller` which is only routed in dev and test environment. New fixtures can be added in the controller.

```Shell
BACKDROP_URL=/backdrop_stub bowl limelight
```

## Starting Limelight with stub data

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

## Tests

To run all tests:

`bundle exec rake test:all`

To run the feature tests:

* Passing tests: `bundle exec rake cucumber:ok`
* Work in progress: `bundle exec rake cucumber:wip`

To run Javascript tests:

* In the browser: `bundle exec rake jasmine`
* In CI: `bundle exec rake jasmine:phantomjs:ci`
* With code coverage: `bundle exec rake jasmine:blanketjs`

To run Javascript style checks:

`bundle exec rake jshint`

**Cucumber tests through Selenium:**

[Download Selenium Server](http://docs.seleniumhq.org/download/) (2.33.0
seems to work nicely). Run it on the host (physical or vm) with the browser under test with:

```shell
java -jar selenium-server-standalone-2.33.0.jar
```

Run the tests:
- `BROWSER_NAME`: eg. firefox, ie, chrome, safari
- `DRIVER_HOST`: The IP address of the host running the selenium server.
- `APP_HOST`: The host name where the app server is already running.
- `APP_HOST_IP`: The IP address where the app server will be run.

Use *either* `APP_HOST` or `APP_HOST_IP`.

    APP_HOST_IP=10.0.0.1 BROWSER_NAME=firefox DRIVER_HOST=10.0.2.2 bundle exec cucumber -p selenium


**Cucumber tests through Sauce:**

[Register with Saucelabs](https://saucelabs.com) and download their [Sauce Connect](https://saucelabs.com/docs/connect) tool. Run it locally with

```shell
java -jar Sauce-Connect.jar <sauce-user> <sauce-key>
```

Run the tests:
- `GOVUK_ASSET_HOST`: Override the asset host so that assets can be loaded from an already running app. Uses `slimmer/test` if not provided.
- `BROWSER`: platform,browser(,version) see their [list of browsers](https://saucelabs.com/docs/platforms)

```shell
GOVUK_ASSET_HOST='https://static.production.alphagov.co.uk' BROWSER="windows xp,firefox" SAUCE_USERNAME=your-sauce-user-name SAUCE_ACCESS_KEY=your-sauce-key bundle exec cucumber -p sauce
```
