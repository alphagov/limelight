@javascript
Feature: Electronic Vehicle Licensing dashboard
  As a service manager
  I want to measure my service
  So that I can take data driven decisions

  Scenario: visiting the dashboard
    When I go to /performance/electronic-vehicle-licensing
    Then the page title should be "Electronic Vehicle Licensing"

  Scenario: looking up the availability module
    Given The electronic-vehicle-licensing monitoring bucket returns the response in "availability.json"
    When I go to /performance/electronic-vehicle-licensing
    Then I should see the module "Service availability"
     And the module should display an uptime of 85.0%
     And the module should display a response time of 150ms
