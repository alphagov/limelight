@javascript
Feature: Electronic Vehicle Licensing dashboard
  As a service manager
  I want to measure my service
  So that I can take data driven decisions

  Scenario: visiting the dashboard
    When I go to /performance/electronic-vehicle-licensing
    Then the page title should be "Electronic Vehicle Licensing"

  Scenario: looking up the uptime module
    Given The electronic-vehicle-licensing monitoring bucket returns the response in "availability.json"
    When I go to /performance/electronic-vehicle-licensing
    Then the uptime module should display 85.0%