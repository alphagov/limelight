@javascript
Feature: Homepage 
  As a user
  I want to see a performance platform homepage
  So I can get an overview of what the performance platform does

  Scenario: visiting the homepage
    When I go to /performance
    Then I should see a link to detailed dashboards
    And I should see a link to compare government services
    And I should see a link to govuk activity
    And the homepage realtime module should display a user count of 13459
