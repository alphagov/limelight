@javascript
Feature: FCO volumetrics graph

  @svg
  Scenario: checking total completion rate for pay-register-death-abroad
     When I go to /performance/pay-register-death-abroad
     Then the completion rate should display "2%"

  @svg
  Scenario: checking applications completed for pay-register-death-abroad
     When I go to /performance/pay-register-death-abroad
     Then the applications completed should display "2.67 mean per week over the last 3 weeks"
