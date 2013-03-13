Given(/^API responds with (.*)$/) do |fixture_file|
  path = Rails.root.join('features', 'fixtures', fixture_file)
  
  httparty_stub = double("HttpParty")
  response_stub = double("response")
  
  httparty_stub.stub(:get)
    .and_return(response_stub)
  
  response_stub.stub(:data).and_return(JSON.parse(File.read(path)))
  
  Songkick::Transport::HttParty.stub(:new)
    .and_return(httparty_stub)
end

When(/^I go to (.*)$/) do |url|
  visit url
end

Then(/^I should get back a status of (\d+)$/) do |status_code|
  page.status_code.should == status_code.to_i
end

Then(/^there should be (\d+) licences$/) do |num_licences|
  page.all("ul#licences li").count.should == num_licences.to_i
end

Then(/^the (\d+)(?:st|nd|rd|th) title should be "(.*?)"$/) do |position, title|
  page.all("ul#licences li")[position.to_i - 1].should have_link(title)
end

Then(/^the (\d+)(?:st|nd|rd|th) link should be "(.*?)"$/) do |position, href|
  page.all("ul#licences li a")[position.to_i - 1][:href].should == href
end
