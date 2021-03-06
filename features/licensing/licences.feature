Feature: Listing licences
  As a user
  I want to see a list of licences
  So I can navigate to individual licences

  Scenario: there are two licences
       When I go to /performance/licensing/licences
       Then I should get back a status of 200
        And there should be a breadcrumb link for "Licensing overview"
        And there should be 2 licences
        And the page title should be "All licences offered on GOV.UK"
        And the "licences" count should be 2
        And the 1st group title should be "A"
        And the 2nd group title should be "R"
        And the 1st title in the 1st group should be "Application to licence a street collection"
        And the 1st link in the 1st group should be "/performance/licensing/licences/application-to-licence-a-street-collection"
        And the 1st title in the 2nd group should be "Register as a scrap metal dealer"
        And the 1st link in the 2nd group should be "/performance/licensing/licences/register-as-a-scrap-metal-dealer"
  
  #wip due to inability to register no license response in multi process (e.g. cross browser) testing
  @no-selenium @svg @wip
  Scenario: there are no licences
       When I go to /performance/licensing/licences
       Then I should get back a status of 200
        And there should be 0 licences
