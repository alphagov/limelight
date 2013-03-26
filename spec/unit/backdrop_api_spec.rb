require 'spec_helper'

describe BackdropAPI do

  before :each do
    @httparty_stub = double("HttpParty")

    Songkick::Transport::HttParty.stub(:new)
    .with("http://backdrop/", :user_agent => "Limelight", :timeout => 30)
    .and_return(@httparty_stub)
  end
  
  describe "get_licences" do
    
    it "should retrieve a list of licences" do
      
      response = {
        "bucket" => "licensing",
        "query" => {
          "group_by" => "licenceUrlSlug",
          "collect" => ["licenceName"],
          "period" => "all"
        },
        "data" => {
          "licenceUrlSlug" => {
            "application-to-licence-a-street-collection" => {
              "licenceName" => ["Application to licence a street collection"],
              "_count" => 2
            },
            "register-as-a-scrap-metal-dealer" => {
              "licenceName" => ["Register as a scrap metal dealer"],
              "_count" => 1
            }
          }
        }
      }
      
      httparty_stub = double("HttpParty")
      response_stub = double("response")
      
      httparty_stub.should_receive(:get)
        .with("/performance/licensing/api?group_by=licenceUrlSlug&collect=licenceName&period=week")
        .and_return(response_stub)
      
      response_stub.stub(:data).and_return(response)
      
      Songkick::Transport::HttParty.should_receive(:new)
        .with("http://backdrop/", :user_agent => "Limelight", :timeout => 30)
        .and_return(httparty_stub)
            
      client = BackdropAPI.new("http://backdrop/")
      
      licences = client.get_licences

      licences["data"]["licenceUrlSlug"].should have(2).licences
      
    end
    
  end

  describe "get_licence" do
    
    it "should retrieve data for a specific licence" do
      
      response = {
        "bucket" => "licensing",
        "query" => {
          "filter_by" => "licenceUrlSlug:application-to-licence-a-street-collection",
          "group_by" => "licenceUrlSlug",
          "collect" => ["licenceName"],
          "period" => "all"
        },
        "data" => {
          "licenceUrlSlug" => {
            "application-to-licence-a-street-collection" => {
              "licenceName" => ["Application to licence a street collection"],
              "_count" => 2
            }
          }
        }
      }
      
      httparty_stub = double("HttpParty")
      response_stub = double("response")
      
      httparty_stub.should_receive(:get)
        .with("/performance/licensing/api?filter_by=licenceUrlSlug:application-to-licence-a-street-collection&group_by=licenceUrlSlug&collect=licenceName&period=all")
        .and_return(response_stub)
      
      response_stub.stub(:data).and_return(response)
      
      Songkick::Transport::HttParty.should_receive(:new)
        .with("http://backdrop/", :user_agent => "Limelight", :timeout => 30)
        .and_return(httparty_stub)
            
      client = BackdropAPI.new("http://backdrop/")
      
      licences = client.get_licence('application-to-licence-a-street-collection')

      licences["data"]["licenceUrlSlug"].should have(1).licences
      licences["data"]["licenceUrlSlug"]["application-to-licence-a-street-collection"]["licenceName"][0].should == "Application to licence a street collection"
      
    end
    
  end

  describe "authentication" do
    it "should authenticate with credentials" do

      response_stub = double("response")
      response_stub.stub(:data).and_return({})

      @httparty_stub.should_receive(:with_headers)
        .with({"Authorization" => "Basic ZG9jdG9yOndobw=="}) # base64 encoded for 'doctor:who'
        .and_return(@httparty_stub)

      @httparty_stub.should_receive(:get)
      .with("/performance/licensing/api?group_by=licenceUrlSlug&collect=licenceName&period=week")
      .and_return(response_stub)

      client = BackdropAPI.new("http://backdrop/", {username: 'doctor', password: 'who'})
      client.get_licences

    end
  end

end
