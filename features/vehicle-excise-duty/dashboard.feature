@javascript
Feature: Vehicle licensing dashboard
  As a service manager
  I want to measure my service
  So that I can take data driven decisions

  Scenario: visiting the dashboard
    When I go to /performance/vehicle-licensing
    Then the page title should be "Vehicle licensing"

  Scenario: looking at the application types graph
    Given The vehicle-excise-duty channels bucket returns the response in "vehicle_excise_duty_services.json"
    When I go to /performance/vehicle-licensing
    Then I should see the module "Applications by service"
     And the module should contain a graph

  Scenario: looking at the application channels graph
    Given The vehicle-excise-duty channels bucket returns the response in "vehicle_excise_duty_channels.json"
    When I go to /performance/vehicle-licensing
    Then I should see the module "Application channels"
     And the module should contain a graph
