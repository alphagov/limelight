require "spec_helper"

describe Licences do
  it "should initialize from a backdrop response" do
    response = {
      "data" => {
        "licenceUrlSlug" => {
          "licence_slug_1" => {
            "licenceName" => ["Licence Slug 1 Name"]
          },
          "licence_slug_2" => {
            "licenceName" => ["Licence Slug 2 Name"]
          }
        }
      }
    }

    licences = Licences.from_backdrop_response(response)

    licences[0].should be_a(Licence)
    licences[0].name.should == "Licence Slug 1 Name"
    licences[0].slug.should == "licence_slug_1"

    licences[1].should be_a(Licence)
    licences[1].name.should == "Licence Slug 2 Name"
    licences[1].slug.should == "licence_slug_2"
  end

  it "should return an empty array when the backdrop response is empty" do
    licences = Licences.from_backdrop_response({})

    licences.should be_empty
  end
end
