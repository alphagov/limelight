@javascript
Feature: SORN dashboard
  As a service manager
  I want to measure my service
  So that I can take data driven decisions

  Scenario: looking at the SORN application volume graph
    Given The vehicle-excise-duty channels bucket returns the response in "vehicle_excise_duty_services.json"
     When I go to /performance/sorn
     Then I should see the module "Applications"
      And the module should contain a graph

   Scenario: looking at the SORN failures module
     Given The vehicle-licensing failures bucket returns the response in "vehicle_licensing_failures.json"
     When I go to /performance/sorn
     Then I should see the module "Application failures"
      And the module should contain a table

  Scenario: looking up the sorn availability module
    Given The register-sorn-statutory-off-road-notification monitoring bucket returns the response in "availability.json"
    When I go to /performance/sorn
    Then I should see the module "Service availability"
     And the module should display an uptime of 85.0%
     And the module should display a response time of 150ms

  Scenario: customer satisfaction module
    Given The vehicle-licensing customer-satisfaction bucket returns the response in "vehicle_licensing_customer_satisfaction.json"
     When I go to /performance/sorn
     Then I should see the module "Customer satisfaction"
      And the module should contain the text "89.1% August 2013"
      And the module should contain the text " -3.61% July 2013"

  Scenario: looking for live users
    Given The register-sorn-statutory-off-road-notification realtime bucket returns the response in "licensing_realtime.json"
     When I go to /performance/sorn
     Then I should see the module "Live service usage"
      And the sorn realtime module should display a user count of 11
