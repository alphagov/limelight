@javascript
@wip
Feature: Pingdom data for licensing
  As a service manager
  I want to know the availability of my service
  So that I can better interpret usage data

  Scenario: visiting the licensing overview page to check licensing availability
    Given Limelight is running
      And API responds with licensing_monitoring_response.json
     When I go to /performance/licensing
     Then the uptime module for licensing should display 100%
      And the response time module for licence finder should display 377ms

  Scenario: visiting the licensing overview page to check licence finder availability
    Given Limelight is running
      And API responds with licence_finder_monitoring_response.json
     When I go to /performance/licensing
     Then the uptime module for licence finder should display 100%
      And the response time module for licence finder should display 259ms
