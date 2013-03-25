Feature: Visiting per-licence
  As a user
  I want to see details about specific licences
  So I can find out how a specific licence is performing
  
  Scenario: licence exists
      Given API responds with application-to-licence-a-street-collection.json
       When I go to /licensing/licences/application-to-licence-a-street-collection
       Then I should get back a status of 200
        And the navigation link for "Licences" should be active
        And the page title should be "Application to licence a street collection"
        And the 1st subtitle should be "Application to licence a street collection applications on GOV.UK"
        And the 2nd subtitle should be "Application to licence a street collection on GOV.UK"
