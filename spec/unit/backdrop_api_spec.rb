require 'spec_helper'

describe BackdropAPI do
  
  describe "get_licences" do
    
    it "should retrieve a list of licences" do
      
      response = { "data" => "some-licenses" }

      FakeWeb.register_uri(:get,
                           "http://backdrop/performance/licensing/api?group_by=licenceUrlSlug&collect=licenceName&period=week",
                           :body => response.to_json)
            
      client = BackdropAPI.new("http://backdrop/")
      licences = client.get_licences

      licences.should == response
    end
    
  end

  describe "get_licence" do
    
    it "should retrieve data for a specific licence" do

      response = { "data" => "data-for-a-specific-licence" }

      FakeWeb.register_uri(:get,
                           "http://backdrop/performance/licensing/api?filter_by=licenceUrlSlug:application-to-licence-a-street-collection&group_by=licenceUrlSlug&collect=licenceName&period=all",
                           :body => response.to_json)

      client = BackdropAPI.new("http://backdrop/")
      
      licences = client.get_licence('application-to-licence-a-street-collection')

      licences["data"].should == "data-for-a-specific-licence"

    end
    
  end

  describe "authentication" do
    it "should authenticate with credentials" do
      response = { "data" => "some-licence-data" }

      FakeWeb.register_uri(:get,
                           "http://backdrop/performance/licensing/api?group_by=licenceUrlSlug&collect=licenceName&period=week", status: 401)

      FakeWeb.register_uri(:get,
                           "http://doctor:who@backdrop/performance/licensing/api?group_by=licenceUrlSlug&collect=licenceName&period=week", :body => response.to_json)

      client = BackdropAPI.new("http://backdrop/", {username: 'doctor', password: 'who'})
      licences = client.get_licences
      licences.should == response
    end
  end

end
