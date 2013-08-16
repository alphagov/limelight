@javascript
Feature: Tax disc dashboard
  As a service manager
  I want to measure my service
  So that I can take data driven decisions

  Scenario: looking at the tax disc application volume graph
    Given The vehicle-excise-duty channels bucket returns the response in "vehicle_excise_duty_services.json"
    When I go to /performance/tax-disc
    Then I should see the module "Tax disc applications"
    And the module should contain a graph

  Scenario: looking at the tax disc failures module
    Given The vehicle-excise-duty failures bucket returns the response in "vehicle_excise_duty_failures.json"
    When I go to /performance/tax-disc
    Then I should see the module "Tax disc application failures"
     And the module should contain a table

  Scenario: looking up the tax disc availability module
    Given The tax-disc monitoring bucket returns the response in "availability.json"
    When I go to /performance/tax-disc
    Then I should see the module "Tax disc service availability"
     And the module should display an uptime of 85.0%
     And the module should display a response time of 150ms
