Then(/^the uptime module for the fco transaction should display (.*)$/) do |uptime|
  page.all('#uptime-module').count.should == 1
  page.find('#uptime-module p.impact-number strong').should have_content('100%')
end
