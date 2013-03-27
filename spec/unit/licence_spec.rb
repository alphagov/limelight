require "spec_helper"

describe Licence do
  it "should initialize from a backdrop response" do
    response = {
      "data" => {
        "licenceUrlSlug" => {
          "some-slug" => {
            "licenceName" => ["Some Name"]
          }
        }
      }
    }

    licence = Licence.from_backdrop_response("some-slug", response)

    licence.should be_a(Licence)
    licence.name.should == "Some Name"
    licence.slug.should == "some-slug"
  end
end