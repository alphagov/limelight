When(/^I select the "(.*?)" tab$/) do |tab|
  step "I click on \"#{tab}\""

  10.times do
    break if page.find('.uptime').text.include?(tab)
    sleep(0.2)
  end
end

Then(/^the module should display an uptime of (.*)$/) do |uptime|
  @module.find('.uptime strong').should have_content(uptime)
  @module.find('.uptime-graph').should have_xpath("./*[name()='svg']")
end

Then(/^the module should display a response time of (.*)$/) do |response_time|
  @module.find('.response-time strong').should have_content(response_time)
  @module.find('.response-time-graph').should have_xpath("./*[name()='svg']")
end
