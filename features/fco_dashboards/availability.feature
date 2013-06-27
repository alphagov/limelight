@javascript
Feature: uptime and response time for fco transactions
  As a service manager
  I want to know the availability of my service
  So that I can better interpret usage data

  Scenario: looking up the uptime on an fco dashboard
    Given Limelight is running
      And the flag show_fco_availability is set
     When I go to /performance/pay-foreign-marriage-certificates
     Then the uptime module for the fco transaction should display 50%
