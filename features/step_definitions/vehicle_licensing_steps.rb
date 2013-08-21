When(/^the realtime module should display a user count of 15$/) do
  @module = page.find('#sorn-realtime strong').should have_content('11')
end
