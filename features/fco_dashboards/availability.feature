@wip
@javascript
Feature: uptime and response time for fco transactions
  As a service manager
  I want to know the availability of my service
  So that I can better interpret useage data

  Scenario: looking up the uptime on an fco dashboard
    Given Limelight is running
     When I go to /performance/pay-register-birth-abroad
     Then the uptime module for the fco transaction should display 100%
