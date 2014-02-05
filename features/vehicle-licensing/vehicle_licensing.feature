@javascript
Feature: Vehicle licensing dashboard
  As a service manager
  I want to measure my service
  So that I can take data driven decisions

  Scenario: visiting the dashboard
    When I go to /performance/vehicle-licensing
    Then the page title should be "Vehicle licensing"

  @svg
  Scenario: looking at the application types graph
    When I go to /performance/vehicle-licensing
    Then I should see the module "Tax disc and SORN – breakdown"
     And the module should contain a graph

  @svg
  Scenario: looking at the application channels graph
    When I go to /performance/vehicle-licensing
    Then I should see the module "Digital, Post Office and DVLA centre – breakdown"
     And the module should contain a graph
