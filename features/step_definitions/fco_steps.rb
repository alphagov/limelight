Then(/^the completion rate should display 2%$/) do
  page.find("#volumetrics-completion-selected strong").should have_content("2%")
end

Then(/^the applications completed should display 3$/) do
  page.find("#volumetrics-submissions-selected strong").should have_content("3  ")
end