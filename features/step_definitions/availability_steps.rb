When(/^I select the "(.*?)" tab$/) do |tab|
  step "I click on \"#{tab}\""
end

Then(/^the module should display an uptime of (.*)$/) do |uptime|
  @module.find('.uptime strong').should have_content(uptime)
  @module.find('.uptime-graph').should have_xpath("./div/*[name()='svg']")
end

Then(/^the module should display a response time of (.*)$/) do |response_time|
  @module.find('.response-time strong').should have_content(response_time)
  @module.find('.response-time-graph').should have_xpath("./div/*[name()='svg']")
end
