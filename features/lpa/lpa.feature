@javascript
Feature: uptime and response time for lpa dashboard
  As a service manager
  I want to know the availability of my service
  So that I can better interpret usage data

  @wip
  Scenario: looking up the uptime
    Given The lasting-power-of-attorney monitoring bucket returns the response in "pay_foreign_marriage_availability.json"
    When I go to /performance/lasting-power-of-attorney
    Then the uptime module should display 85%

  @wip
  Scenario: looking up the response time
    Given The lasting-power-of-attorney monitoring bucket returns the response in "pay_foreign_marriage_availability.json"
    When I go to /performance/lasting-power-of-attorney
    Then the response module should display 150ms
