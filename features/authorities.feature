Feature: Listing authorities
  As a user
  I want to see a list of authorities
  So I can navigate to individual authorities

  Scenario: there are two authorities
    Given API responds with two_authorities.json
    When I go to /performance/licensing/authorities
    Then I should get back a status of 200
    And the navigation link for "Authorities" should be active
    And there should be 2 authorities

